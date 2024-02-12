import { useSelector } from 'react-redux'
import TransactionService from '../../service/TransactionService'
import BranchService from '../../service/BranchService'
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
  product: '',
  branch: '',
}

const PopupRequestProduct = ({ product, isOpen, onClose, isHaveBranch }) => {
  const { users } = useSelector((state) => state.users)
  const { branch } = useSelector((state) => state.branchs)
  const [branchList, setBranchList] = useState([])
  const [error, setError] = useState(false)
  const [form, setForm] = useState(initialState)

  const findMyBranch = () => {
    BranchService.findBranchByManager(users?._id).then(({ data }) => {
      setBranchList(data)
    })
  }

  const handleForm = (e) => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const requestOrder = () => {
    console.log(form)
    if (form?.amount && form?.product && form?.branch) {
      if (form?.amount != 0) {
        setError(false)
        TransactionService.request(form)
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
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    findMyBranch()
  }, [])

  useEffect(() => {
    if (isOpen) {
      if (isHaveBranch) {
        setForm({ product: product, branch: branch })
      } else {
        setForm({ product: product })
      }
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
                helperText={!form?.amount && 'Amount is required'}
                value={form?.amount}
                onChange={handleForm}
              />
            </Grid>
            {!isHaveBranch && (
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel>สาขา</InputLabel>
                  <Select
                    name="branch"
                    value={form?.branch}
                    label="สาขา"
                    onChange={handleForm}
                    error={error && !form?.branch}
                    helperText={!form?.branch && 'Branch is required'}
                  >
                    {branchList?.map((item, idx) => {
                      return (
                        <MenuItem
                          value={item?._id}
                          key={idx}
                        >{`${item?.name}`}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained">
            ยกเลิก
          </Button>
          <Button autoFocus variant="contained" onClick={requestOrder}>
            บันทึกรายการ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PopupRequestProduct
