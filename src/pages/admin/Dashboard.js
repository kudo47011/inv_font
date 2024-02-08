import React from 'react'
import LocationBranch from '../../components/LocationBranch'
import PaginationTransaction from '../../components/PaginationTransaction'

const markerPositions = [
  { lat: 15.225245, lng: 101.514008, branch: 'KK' },
  { lat: 16.448914, lng: 102.544791, branch: 'BKK' },
]

const people = [
  { name:'a', branch: 'KK', amount: 20, status: 'Waiting' },
  { name:'a', branch: 'BKK', amount: 15, status: 'In progress' },
  { name:'a', branch: 'CM', amount: 15, status: 'Success' },
  { name:'a', branch: 'BKK', amount: 15, status: 'Success' },
  { name:'a', branch: 'KK', amount: 15, status: 'Success' },
  { name:'a', branch: 'BKK', amount: 15, status: 'Waiting' },
  { name:'a', branch: 'BKK', amount: 15, status: 'In progress' },
  { name:'a', branch: 'CM', amount: 15, status: 'Waiting' },
  { name:'a', branch: 'KK', amount: 15, status: 'Waiting' },
  { name:'a', branch: 'CM', amount: 15, status: 'In progress' },
  { name:'a', branch: 'CM', amount: 15, status: 'Waiting' },
  { name:'a', branch: 'KK', amount: 15, status: 'Waiting' },
  { name:'a', branch: 'CM', amount: 15, status: 'In progress' },
  { name:'a', branch: 'UBON', amount: 15, status: 'Waiting' },
  { name:'a', branch: 'UBON', amount: 15, status: 'Waiting' },
  { name:'a', branch: 'UBON', amount: 15, status: 'Waiting' },
]

const itemsPerPage = 10

const Dashboard = () => {
  return (
    <div>
      <LocationBranch data={markerPositions} />
      <div className='pagination-box'>
        <PaginationTransaction data={people} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  )
}

export default Dashboard
