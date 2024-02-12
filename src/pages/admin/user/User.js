import { useState, useEffect } from 'react'
import React from 'react'
import { Grid, Button } from '@mui/material'
import UserService from '../../../service/UserService'
import PaginationUsers from '../../../components/user/PaginationUsers'
import PopupCreateUser from '../../../components/user/PopupCreateUser'

export default function User() {
  const [isOpen, setIsOpen] = useState(false)
  const [usersList, setUsersList] = useState([])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const fetchUser = () => {
    UserService.findAllUser().then(({ data }) => {
      setUsersList(data)
    })
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: '7px' }}>
        <Grid xs={6} item>
          <div
            style={{ fontSize: 20, fontWeight: 'bold', marginBottom: '7px' }}
          >
            รายการผู้ใช้งาน
          </div>
        </Grid>
        <Grid xs={6} style={{ display: 'flex', justifyContent: 'end' }} item>
          <Button color="success" variant="contained" onClick={handleToggle}>
            เพิ่มข้อมูลผู้ใช้
          </Button>
        </Grid>
      </Grid>
      <PaginationUsers
        data={usersList}
        itemsPerPage={10}
        fetch={() => {
          fetchUser()
        }}
      />
      {isOpen && <PopupCreateUser fetchUser={fetchUser} isOpen={isOpen} onClose={handleToggle} />}
    </div>
  )
}
