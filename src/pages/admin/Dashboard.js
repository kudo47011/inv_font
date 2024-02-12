import React, { useState, useEffect } from 'react'
import LocationBranch from '../../components/dashboard/LocationBranch'
import PaginationWaitingTransaction from '../../components/dashboard/PaginationWaitingTransaction'
import PaginationProgressTransaction from '../../components/dashboard/PaginationInProgressTransaction'
import PaginationSuccessTransaction from '../../components/dashboard/PaginationSuccessTransaction'
import BranchService from '../../service/BranchService'
import TransactionService from '../../service/TransactionService'
import io from 'socket.io-client'

const itemsPerPage = 10

const Dashboard = () => {
  const [branchList, setBranchList] = useState([])
  const [transactionList, setTransactionList] = useState([])
  const [transactionProgressList, setTransactionProgressList] = useState([])
  const [transactionSuccessList, setTransactionSuccessList] = useState([])

  useEffect(() => {
    fetchBranch()
    fetchTransaction()
    fetchInprogressTransaction()
    fetchSuccessTransaction()
  }, [])

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_ENDPOINT}`) // Replace with your server URL

    // Event listener for receiving messages from the server
    socket.on('transaction', (data) => {
      switch (data) {
        case 'approve':
          fetchTransaction()
          fetchInprogressTransaction()
          break
        case 'request':
          fetchTransaction()
          break
        case 'add':
          fetchInprogressTransaction()
          fetchSuccessTransaction()
          break
      }
    })

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  const fetchBranch = () => {
    BranchService.findBranch().then(({ data }) => {
      setBranchList(data)
    })
  }

  const fetchTransaction = () => {
    TransactionService.findTransaction().then(({ data }) => {
      setTransactionList(data)
    })
  }

  const fetchInprogressTransaction = () => {
    TransactionService.findInprogressTransaction().then(({ data }) => {
      setTransactionProgressList(data)
    })
  }

  const fetchSuccessTransaction = () => {
    TransactionService.findSuccessTransaction().then(({ data }) => {
      setTransactionSuccessList(data)
    })
  }

  return (
    <div>
      <LocationBranch data={branchList} />
      <br></br>
      <PaginationWaitingTransaction
        data={transactionList}
        itemsPerPage={itemsPerPage}
        fetch={() => {
          fetchTransaction()
        }}
        fetch2={() => {
          fetchInprogressTransaction()
        }}
      />
      <br></br>
      <PaginationProgressTransaction
        data={transactionProgressList}
        itemsPerPage={itemsPerPage}
        fetch={() => {
          fetchInprogressTransaction()
        }}
        fetch2={() => {
          fetchSuccessTransaction()
        }}
      />
      <br></br>
      <PaginationSuccessTransaction
        data={transactionSuccessList}
        itemsPerPage={itemsPerPage}
        fetch={() => {
          fetchSuccessTransaction()
        }}
      />
    </div>
  )
}

export default Dashboard
