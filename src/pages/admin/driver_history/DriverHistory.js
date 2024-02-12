import { useState, useEffect } from 'react'
import TransactionService from '../../../service/TransactionService'
import PaginationDriverHistory from '../../../components/driver_history/PaginationDriverHistory'

const DriverHistory = () => {
  const [historyList, setHistory] = useState([])

  const fetchHistory = () => {
    TransactionService.findDriverHistory().then(({ data }) => {
      setHistory(data)
    })
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div>
        <PaginationDriverHistory data={historyList} itemsPerPage={10} />
    </div>
  )
}

export default DriverHistory
