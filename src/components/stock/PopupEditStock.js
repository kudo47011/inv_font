import { useSelector } from 'react-redux'
import InventoryService from '../../service/InventoryService'
import { useEffect, useState } from 'react'
import {
  Grid,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Dialog,
  InputLabel,
  TextField,
} from '@mui/material'
import Swal from 'sweetalert2'

const initialState = {
  amount: 0,
}

const PopupEditStock = ({ inv_id, amount, isOpen, onClose, fetch }) => {
  const [error, setError] = useState(false)
  const [form, setForm] = useState(initialState)

  const handleForm = (e) => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const editStock = () => {
    if (form?.amount) {
      InventoryService.editStock(inv_id, form)
        .then(({ data }) => {
          Swal.fire({
            title: 'สำเร็จ',
            text: `บันทึกรายการสำเร็จ`,
            icon: 'success',
            confirmButtonText: 'Cool',
          })
          onClose()
          fetch()
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
  }

  useEffect(() => {
    if (isOpen) {
      setForm({ amount })
    }
  }, [isOpen])

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} fullWidth>
        <DialogTitle>แจ้งเพิ่มสินค้า</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={12}>
              <TextField
                name="amount"
                label="จำนวน"
                variant="outlined"
                fullWidth
                error={error && !form?.amount}
                helperText={!form?.amount && 'Branch is required'}
                value={form?.amount}
                onChange={handleForm}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" color='error'>
            ยกเลิก
          </Button>
          <Button autoFocus variant="contained" color='success' onClick={editStock}>
            บันทึกรายการ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PopupEditStock
