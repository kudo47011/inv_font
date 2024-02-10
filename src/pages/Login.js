import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { TextField, Button, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from '../service/AuthService';
import { setAuthentication } from "../redux/slices/users"
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const theme = createTheme();

const initialForm = {
  username: "",
  password: ""
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)

  const handleForm = (e) => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    AuthService.login(form).then(({ data }) => {
      let { token, user } = data
      const decoded = jwtDecode(token);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("expired", decoded?.exp);
      dispatch(setAuthentication(user))
      if (user?.role == 'admin') {
        navigate('/dashboard')
      } else if (user?.role == 'manager') {
        navigate('/dashboard')
      } else if (user?.role == 'driver') {
        navigate('/dashboard/transaction')
      }
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
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            name="username"
            value={form?.username}
            onChange={handleForm}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name='password'
            value={form?.password}
            onChange={handleForm}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Login
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;