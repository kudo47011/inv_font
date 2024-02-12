import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import GoogleMapReact from 'google-map-react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Grid, TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import BranchService from '../../service/BranchService';

const initialState = {
    _id: "",
    name: "",
    manager: "",
    lat: 0,
    lng: 0
}


export default function PopupEditBranch({ isOpen, exit, selectData, fetch }) {
    const [form, setForm] = useState(initialState)
    const { usersList } = useSelector((state) => state.users);

    useEffect(() => {
        if (isOpen) {
            setForm({ ...selectData, manager: selectData?.manager?._id })
        }
    }, [isOpen])

    const handleForm = (e) => {
        let { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const Marker = ({ text }) => <div>📍{text}</div>;

    const updateBranch = () => {
        BranchService.updateBranch(form?._id, form).then(() => {
            fetch()
            exit()
        })
    }

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={exit}
                fullWidth
            >
                <DialogTitle>
                    แก้ไขข้อมูลสาขา
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={12}>
                            <Box sx={{ height: '50vh', width: "100%" }}>

                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyB80nEBblSL_qgiXUpLciZxrZfHTjA5CSw' }}
                                    defaultCenter={{
                                        lat: form?.lat,
                                        lng: form?.lng
                                    }}
                                    defaultZoom={10}
                                    draggable={true}
                                    onClick={(e) => { setForm({ ...form, lat: e?.lat, lng: e?.lng }) }}
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
                            <TextField name='name' label="ชื่อสาขา" variant="outlined" fullWidth value={form?.name} onChange={handleForm} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                                <InputLabel>ผู้จัดการสาขา</InputLabel>
                                <Select
                                    name='manager'
                                    value={form?.manager}
                                    label="ผู้จัดการสาขา"
                                    onChange={handleForm}
                                >
                                    {usersList?.map((item, idx) => {
                                        return (
                                            <MenuItem value={item?._id} key={idx}>{`${item?.firstname} ${item?.lastname}`}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={exit} variant="contained">ยกเลิก</Button>
                    <Button autoFocus variant="contained" onClick={updateBranch}>
                        บันทึกรายการ
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
