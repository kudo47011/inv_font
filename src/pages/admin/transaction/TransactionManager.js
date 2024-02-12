import PaginationProgressTransaction from '../../../components/dashboard/PaginationInProgressTransaction'
import React, { useState, useEffect } from 'react'
import TransactionService from '../../../service/TransactionService'
import { useSelector } from 'react-redux'
import PaginationAllMyTransaction from '../../../components/transaction/PaginationAllMyTransaction'

const itemsPerPage = 10

export default function TransactionManager() {
  const [transactionList, setTransactionList] = useState([])
    const {users} = useSelector((state) => state.users)

  useEffect(() => {
    fetchAllMyTransaction()
  }, [])

  const fetchAllMyTransaction = () => {
    TransactionService.findAllMyTransaction(users?._id).then(({ data }) => {
      setTransactionList(data)
      console.log(data);
    })
  }

  return (
    <div>
      <PaginationAllMyTransaction data={transactionList} itemsPerPage={itemsPerPage} />
    </div>
  )
}
