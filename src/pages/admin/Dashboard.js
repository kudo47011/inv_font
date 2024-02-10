import React, { useState, useEffect } from 'react'
import LocationBranch from '../../components/LocationBranch'
import PaginationWaitingTransaction from '../../components/PaginationWaitingTransaction'
import PaginationProgressTransaction from '../../components/PaginationInProgressTransaction'
import PaginationSuccessTransaction from '../../components/PaginationSuccessTransaction'
import BranchService from "../../service/BranchService"
import TransactionService from "../../service/TransactionService"

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
      <PaginationWaitingTransaction data={transactionList} itemsPerPage={itemsPerPage} fetch={() => { fetchTransaction() }} fetch2={() => { fetchInprogressTransaction() }} />
      <br></br>
      <PaginationProgressTransaction data={transactionProgressList} itemsPerPage={itemsPerPage} fetch={() => { fetchInprogressTransaction() }} fetch2={() => { fetchSuccessTransaction() }} />
      <br></br>
      <PaginationSuccessTransaction data={transactionSuccessList} itemsPerPage={itemsPerPage} fetch={() => { fetchSuccessTransaction() }} />
    </div>
  )
}

export default Dashboard
