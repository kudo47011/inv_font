import React from 'react'
import PopupBranch from '../../../components/branch/PopupCreateBranch'
import { useState } from 'react'
import { Button, Box, Grid } from '@mui/material'
import PaginationBranch from '../../../components/branch/PaginationBranch'
import { useEffect } from 'react'
import BranchService from '../../../service/BranchService'
import UserService from '../../../service/UserService'
import { setUserList } from "../../../redux/slices/users"
import { useDispatch } from "react-redux"

export default function Branch() {
  const [isOpen, setIsOpen] = useState(false)
  const [branchList, setBranchList] = useState([])
  const dispatch = useDispatch()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const fetchBranch = () => {
    BranchService.findBranch().then(({ data }) => {
      setBranchList(data)
    })
  }

  const fetchUser = () => {
    UserService.findUser().then(({ data }) => {
      dispatch(setUserList(data))
    })
  }

  useEffect(() => {
    fetchBranch()
    fetchUser()
  }, [])

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: '7px' }}>
        <Grid xs={6} item>
          <div
            style={{ fontSize: 20, fontWeight: 'bold', marginBottom: '7px' }}
          >
            รายการสาขา
          </div>
        </Grid>
        <Grid xs={6} style={{ display: 'flex', justifyContent: 'end' }} item>
          <Button color='success' variant="contained" onClick={handleToggle}>
            เพิ่มสาขา
          </Button>
        </Grid>
      </Grid>
      {isOpen && <PopupBranch fetchBranch={fetchBranch} isOpen={isOpen} onClose={handleToggle} />}
      <PaginationBranch
        data={branchList}
        itemsPerPage={10}
        fetch={() => {
          fetchBranch()
        }}
      />
    </div>
  )
}
