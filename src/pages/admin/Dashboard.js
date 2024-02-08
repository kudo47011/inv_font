import React, { useState, useEffect } from 'react'
import LocationBranch from '../../components/LocationBranch'
import PaginationTransaction from '../../components/PaginationTransaction'
import BranchService from "../../service/BranchService"
import TransactionService from "../../service/TransactionService"


const people = [
  { name: 'a', branch: 'KK', amount: 20, status: 'Waiting' },
  { name: 'a', branch: 'BKK', amount: 15, status: 'In progress' },
  { name: 'a', branch: 'CM', amount: 15, status: 'Success' },
  { name: 'a', branch: 'BKK', amount: 15, status: 'Success' },
  { name: 'a', branch: 'KK', amount: 15, status: 'Success' },
  { name: 'a', branch: 'BKK', amount: 15, status: 'Waiting' },
  { name: 'a', branch: 'BKK', amount: 15, status: 'In progress' },
  { name: 'a', branch: 'CM', amount: 15, status: 'Waiting' },
  { name: 'a', branch: 'KK', amount: 15, status: 'Waiting' },
  { name: 'a', branch: 'CM', amount: 15, status: 'In progress' },
  { name: 'a', branch: 'CM', amount: 15, status: 'Waiting' },
  { name: 'a', branch: 'KK', amount: 15, status: 'Waiting' },
  { name: 'a', branch: 'CM', amount: 15, status: 'In progress' },
  { name: 'a', branch: 'UBON', amount: 15, status: 'Waiting' },
  { name: 'a', branch: 'UBON', amount: 15, status: 'Waiting' },
  { name: 'a', branch: 'UBON', amount: 15, status: 'Waiting' },
]

const itemsPerPage = 10

const Dashboard = () => {
  const [branchList, setBranchList] = useState([])
  const [transactionList, setTransactionList] = useState([])

  useEffect(() => {
    fetchBranch()
    fetchTransaction()
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

  return (
    <div>
      <LocationBranch data={branchList} />
      <PaginationTransaction data={transactionList} fetch={() => { fetchTransaction() }} />
      {/* <div className='pagination-box'>
        <PaginationTransaction data={people} itemsPerPage={itemsPerPage} />
      </div> */}
    </div>
  )
}

export default Dashboard
