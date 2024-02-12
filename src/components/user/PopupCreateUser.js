import React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from '@mui/material'
import GoogleMapReact from 'google-map-react'

import UserService from '../../service/UserService'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

const initialForm = {
  username: '',
  password: '',
  firstname: '',
  lastname: '',
  role: '',
}

const roles = ['admin', 'manager', 'driver']

const PopupCreateUser = ({ isOpen, onClose, fetchUser }) => {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState(false)

  const handleForm = (e) => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    if (
      form?.username &&
      form?.password &&
      form?.firstname &&
      form?.lastname &&
      form?.role
    ) {
      setError(false)
      UserService.createUser(form)
        .then(({ data }) => {
          Swal.fire({
            title: 'สำเร็จ',
            text: `บันทึกรายการสำเร็จ`,
            icon: 'success',
            confirmButtonText: 'Cool',
          })
          onClose()
          fetchUser()
        })
        .catch((error) => {
          Swal.fire({
            title: 'Error!',
            text: `${error?.response?.data?.message}`,
            icon: 'error',
            confirmButtonText: 'Cool',
          })
        })
    } else {
      setError(true)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>เพิ่มข้อมูลผู้ใช้</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={12}>
            <TextField
              name="username"
              label="ชื่อผู้ใช้"
              variant="outlined"
              error={error && !form?.username}
              helperText={!form?.username && 'Username is required'}
              fullWidth
              value={form?.username}
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="password"
              name="password"
              label="รหัสผ่าน"
              variant="outlined"
              error={error && !form?.password}
              helperText={!form?.password && 'Password is required'}
              fullWidth
              value={form?.password}
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="firstname"
              label="ชื่อ"
              variant="outlined"
              fullWidth
              error={error && !form?.firstname}
              helperText={!form?.firstname && 'Firstname is required'}
              value={form?.firstname}
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="lastname"
              label="นามสกุล"
              variant="outlined"
              fullWidth
              error={error && !form?.lastname}
              helperText={!form?.lastname && 'Lastname is required'}
              value={form?.lastname}
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel>ตำแหน่ง</InputLabel>
              <Select
                name="role"
                value={form?.role}
                label="ตำแหน่ง"
                onChange={handleForm}
                error={error && !form?.role}
                helperText={!form?.role && 'Role is required'}
              >
                {roles?.map((item, idx) => {
                  return <MenuItem value={item} key={idx}>{`${item}`}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          ยกเลิก
        </Button>
        <Button
          autoFocus
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          บันทึกรายการ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PopupCreateUser
