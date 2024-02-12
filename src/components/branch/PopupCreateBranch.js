import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Grid, TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import GoogleMapReact from 'google-map-react'

import UserService from '../../service/UserService'
import { useState, useEffect } from 'react'
import BranchService from '../../service/BranchService'
import Swal from 'sweetalert2'

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
  name: '',
  manager: '',
  lat: 0,
  lng: 0,
}

const PopupBranch = ({ isOpen, onClose, fetchBranch }) => {
  const [usersList, setUserList] = useState([])
  const [form, setForm] = useState(initialForm)

  const fetchUser = () => {
    UserService.findUser().then(({ data }) => {
      setUserList(data)
    })
  }

  const handleForm = (e) => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleSubmit = (e) => {
    BranchService.createBranch(form)
      .then(({ data }) => {
        Swal.fire({
          title: 'สำเร็จ',
          text: `บันทึกรายการสำเร็จ`,
          icon: 'success',
          confirmButtonText: 'Cool',
        })
        onClose()
        fetchBranch()
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

  const defaultProps = {
    center: {
      lat: 15.225245,
      lng: 101.514008,
    },
    zoom: 6,
  }

  const Marker = ({ text }) => <div>📍{text}</div>;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>เพิ่มข้อมูลสาขา</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={12}>
            <Box sx={{ height: '50vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyB80nEBblSL_qgiXUpLciZxrZfHTjA5CSw',
                }}
                defaultCenter={{
                  lat: defaultProps?.center?.lat,
                  lng: defaultProps?.center?.lng,
                }}
                defaultZoom={defaultProps.zoom}
                draggable={true}
                onClick={(e) => {
                  setForm({ ...form, lat: e?.lat, lng: e?.lng })
                }}
              >
                <Marker
                  lat={form?.lat || 0}
                  lng={form?.lng || 0}
                  text="ตำแหน่งปัจจุบัน"
                />
              </GoogleMapReact>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="name"
              label="ชื่อสาขา"
              variant="outlined"
              fullWidth
              value={form?.name}
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel>ผู้จัดการสาขา</InputLabel>
              <Select
                name="manager"
                value={form?.manager}
                label="ผู้จัดการสาขา"
                onChange={handleForm}
              >
                {usersList?.map((item, idx) => {
                  return (
                    <MenuItem
                      value={item?._id}
                      key={idx}
                    >{`${item?.firstname} ${item?.lastname}`}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color='error'>
          ยกเลิก
        </Button>
        <Button autoFocus variant="contained" color='success' onClick={handleSubmit}>
          บันทึกรายการ
        </Button>
      </DialogActions>
    </Dialog>
    // <Modal
    //   className={`popup ${isOpen ? 'open' : ''}`}
    //   open={isOpen}
    //   onClose={onClose}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    //   <Box sx={style}>
    //     <Typography id="modal-modal-title" variant="h6" component="h2">
    //       เพิ่มข้อมูลสาขา
    //     </Typography>
    //     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    //       ผู้จัดการสาขา
    //       <Select style={{minWidth: 300}} value={form?.manager} onChange={handleSelectChange}>
    //         {userList.map((item) => (
    //           <MenuItem key={item.username} value={item._id}>
    //             {item.firstname+ " " + item.lastname}
    //           </MenuItem>
    //         ))}
    //       </Select>
    //       <TextField
    //         label="ชื่อสาขา"
    //         variant="outlined"
    //         name="name"
    //         value={form?.name}
    //         onChange={handleForm}
    //         fullWidth
    //         margin="normal"
    //       />
    //       <TextField
    //         label="Lat"
    //         variant="outlined"
    //         name="lat"
    //         value={form?.lat}
    //         onChange={handleForm}
    //         fullWidth
    //         margin="normal"
    //       />
    //       <TextField
    //         label="Lng"
    //         variant="outlined"
    //         name="lng"
    //         value={form?.lng}
    //         onChange={handleForm}
    //         fullWidth
    //         margin="normal"
    //       />
    //       <Grid sx={{ mt: 1}} container direction="column">
    //         <Grid align="center" direction="row" container>
    //           <Grid item>
    //             <Button variant="contained" color="success" onClick={handleSubmit}>
    //               สร้าง
    //             </Button>
    //           </Grid>
    //           &nbsp;
    //           <Grid item>
    //             <Button variant="contained" color="error" onClick={onClose}>
    //               ยกเลิก
    //             </Button>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Typography>
    //   </Box>
    // </Modal>
  )
}

export default PopupBranch
