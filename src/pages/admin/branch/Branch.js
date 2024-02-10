import React from 'react'
import PopupBranch from '../../../components/PopupCreateBranch'
import { useState } from 'react'
import { Button, Box } from '@mui/material'
import PaginationBranch from '../../../components/PaginationBranch'
import { useEffect } from 'react'
import BranchService from '../../../service/BranchService'

export default function Branch() {
  const [isOpen, setIsOpen] = useState(false)
  const [branchList, setBranchList] = useState([])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const fetchBranch = () => {
    BranchService.findBranch().then(({ data }) => {
      setBranchList(data)
    })
  }

  useEffect(() => {
    fetchBranch()
  }, [])


  return (
    <div>
      <Box sx={{ flexDirection: 'row-reverse', mb: 2 }}>
        <Button variant="contained" onClick={handleToggle}>
          เพิ่มสาขา
        </Button>
      </Box>
      {isOpen && <PopupBranch isOpen={isOpen} onClose={handleToggle} />}
      <PaginationBranch data={branchList} itemsPerPage={10} fetch={() => {fetchBranch()}}/>
    </div>
  )
}
