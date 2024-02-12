import PaginationProgressTransaction from '../../../components/dashboard/PaginationInProgressTransaction'
import React, { useState, useEffect } from 'react'
import TransactionService from '../../../service/TransactionService'
import io from 'socket.io-client'

const itemsPerPage = 10

export default function Transaction() {
  const [transactionProgressList, setTransactionProgressList] = useState([])

  useEffect(() => {
    fetchInprogressTransaction()
  }, [])

  const fetchInprogressTransaction = () => {
    TransactionService.findInprogressTransaction().then(({ data }) => {
      setTransactionProgressList(data)
    })
  }

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_ENDPOINT}`) // Replace with your server URL

    // Event listener for receiving messages from the server
    socket.on('transaction', (data) => {
      console.log(data);
      switch (data) {
        case 'request':
          fetchInprogressTransaction()
          break
        case 'cancel':
          fetchInprogressTransaction()
          break
        case 'approve':
          fetchInprogressTransaction()
          break
        case 'add':
          fetchInprogressTransaction()
          break
      }
    })

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div>
      <PaginationProgressTransaction
        data={transactionProgressList}
        itemsPerPage={itemsPerPage}
        fetch={() => {
          fetchInprogressTransaction()
        }}
      />
    </div>
  )
}
