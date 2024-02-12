import { useState } from 'react'
import UserService from '../../service/UserService'
import Swal from 'sweetalert2'
import {
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from '@mui/material'

const initialState = {
  password: '',
  confirmPassword: '',
}

const PopupNewPassword = ({ user, isOpen, onClose }) => {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState(false)

  const handleForm = (e) => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const newPassword = () => {
    if (form?.password && form?.confirmPassword) {
      if (form?.password != form?.confirmPassword) {
        Swal.fire({
          title: 'Error!',
          text: `กรุณากรอกรหัสให้ตรงกัน`,
          icon: 'error',
          confirmButtonText: 'Cool',
        })
      } else {
        UserService.newPassword(user._id, {new_pass: form?.password})
          .then(({ data }) => {
            Swal.fire({
              title: 'สำเร็จ',
              text: `บันทึกรายการสำเร็จ`,
              icon: 'success',
              confirmButtonText: 'Cool',
            })
            onClose()
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: `${error?.response?.data?.message}`,
              icon: 'error',
              confirmButtonText: 'Cool',
            })
          })
      }
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>แก้ไขรหัสผ่าน</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={12}>
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              error={error && !form?.password}
              helperText={!form?.password && 'required'}
              fullWidth
              value={form?.password}
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="confirmPassword"
              type="password"
              label="Confirm password"
              variant="outlined"
              fullWidth
              error={error && !form?.confirmPassword}
              helperText={!form?.confirmPassword && 'required'}
              value={form?.confirmPassword}
              onChange={handleForm}
            />
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
          onClick={newPassword}
        >
          บันทึกข้อมูล
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PopupNewPassword
