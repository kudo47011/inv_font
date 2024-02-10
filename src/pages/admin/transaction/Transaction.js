import PaginationProgressTransaction from '../../../components/PaginationInProgressTransaction'
import React, { useState, useEffect } from 'react'
import TransactionService from '../../../service/TransactionService'

const itemsPerPage = 10

export default function Transaction() {
  const [transactionProgressList, setTransactionProgressList] = useState([])

  useEffect(() => {
    fetchInprogressTransaction()
  }, [])

  const fetchInprogressTransaction = () => {
    TransactionService.findTransaction().then(({ data }) => {
      setTransactionProgressList(data)
    })
  }

  return (
    <div className='xxx'>
      <PaginationProgressTransaction data={transactionProgressList} itemsPerPage={itemsPerPage} fetch={() => { fetchInprogressTransaction() }} />
    </div>
  )
}
