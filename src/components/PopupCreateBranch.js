import React from 'react'
import { Modal, Box, Typography, Grid, Button, Select, MenuItem, TextField, Dialog } from '@mui/material'
import UserService from '../service/UserService'
import { useState, useEffect } from 'react'
import BranchService from '../service/BranchService'
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const initialForm = {
  name: "",
  manager: "",
  lat: 0,
  lng: 0
}

const PopupBranch = ({ isOpen, onClose }) => {
  const [userList, setUserList] = useState([])
  const [form, setForm] = useState(initialForm)
  const navigate = useNavigate()

  const fetchUser = () => {
    UserService.findUser().then(({ data }) => {
      setUserList(data)
    })
  }

  const handleSelectChange = (event) => {
    setForm({...form, manager: event.target.value})
  }

  const handleForm = (e) => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
    console.log(form);
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleSubmit = (e) => {
    BranchService.createBranch(form).then(({ data }) => {
      onClose()
    }).catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: `${error?.response?.data?.message}`,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    })
  };

  return (
    <Modal
      className={`popup ${isOpen ? 'open' : ''}`}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          เพิ่มข้อมูลสาขา
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ผู้จัดการสาขา
          <Select style={{minWidth: 300}} value={form?.manager} onChange={handleSelectChange}>
            {userList.map((item) => (
              <MenuItem key={item.username} value={item._id}>
                {item.firstname+ " " + item.lastname}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="ชื่อสาขา"
            variant="outlined"
            name="name"
            value={form?.name}
            onChange={handleForm}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Lat"
            variant="outlined"
            name="lat"
            value={form?.lat}
            onChange={handleForm}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Lng"
            variant="outlined"
            name="lng"
            value={form?.lng}
            onChange={handleForm}
            fullWidth
            margin="normal"
          />
          <Grid sx={{ mt: 1}} container direction="column">
            <Grid align="center" direction="row" container>
              <Grid item>
                <Button variant="contained" color="success" onClick={handleSubmit}>
                  สร้าง
                </Button>
              </Grid>
              &nbsp;
              <Grid item>
                <Button variant="contained" color="error" onClick={onClose}>
                  ยกเลิก
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Typography>
      </Box>
    </Modal>
  )
}

export default PopupBranch
