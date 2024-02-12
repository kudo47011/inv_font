import PaginationProgressTransaction from '../../../components/dashboard/PaginationInProgressTransaction'
import React, { useState, useEffect } from 'react'
import TransactionService from '../../../service/TransactionService'

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

  return (
    <div>
      <PaginationProgressTransaction data={transactionProgressList} itemsPerPage={itemsPerPage} fetch={() => { fetchInprogressTransaction() }} />
    </div>
  )
}
