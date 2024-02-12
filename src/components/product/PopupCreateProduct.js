import React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
} from '@mui/material'

import { useState } from 'react'
import Swal from 'sweetalert2'
import ProductService from '../../service/ProductService'

const PopupCreateProduct = ({ isOpen, onClose, fetchProduct }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [file, setFile] = useState()
  const [preview, setPreview] = useState()

  const handleImageChange = (e) => {
    setFile(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    if (name && file) {
      setError(false)
      let payload = new FormData()
      payload.append('name', name)
      payload.append('image', file)
      ProductService.createProduct(payload)
        .then(({ data }) => {
          Swal.fire({
            title: 'สำเร็จ',
            text: `บันทึกรายการสำเร็จ`,
            icon: 'success',
            confirmButtonText: 'Cool',
          })
          onClose()
          fetchProduct()
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
            {file && (
              <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
                <img style={{ width: '50%', height: '100%' }} src={preview} />
              </div>
            )}
            <TextField
              name="file"
              variant="outlined"
              fullWidth
              id="file"
              type="file"
              error={error && !file}
              helperText={!file && 'File is required'}
              onChange={handleImageChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="name"
              label="ชื่อ"
              variant="outlined"
              fullWidth
              error={error && !name}
              helperText={!name && 'Name is required'}
              value={name}
              onChange={handleChangeName}
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
          onClick={handleSubmit}
        >
          บันทึกรายการ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PopupCreateProduct
