import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import {
  Routes,
  Route,
  Outlet,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Permission from '../context/permission.json'
import { setLogOut } from '../redux/slices/users'
import { setEmpty } from '../redux/slices/report'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import InventoryIcon from '@mui/icons-material/Inventory'
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard'
import CategoryIcon from '@mui/icons-material/Category'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'

import { useEffect } from 'react'
import io from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import NotificationSound from '../assets/sound/noti-sound.mp3'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function MiniDrawer() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const { users } = useSelector((state) => state.users)
  const navigate = useNavigate()

  const logout = () => {
    dispatch(setLogOut())
    dispatch(setEmpty())
    navigate('/login')
    localStorage.clear()
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const playSound = () => {
    const audio = new Audio(NotificationSound);
    audio.play();
  };

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_ENDPOINT}`) // Replace with your server URL

    // Event listener for receiving messages from the server
    socket.on('transaction', (data) => {
      playSound();
      switch (data) {
        case 'add':
          toast.success('ทำรายการขนส่งเสร็จสิ้น', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          break
        case 'cancel':
          toast.error('ยกเลิกรายการแจ้งเพิ่มสินค้า', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          break
        case 'request':
          toast.warn('มีรายการแจ้งเพิ่มสินค้าใหม่!!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          break
      }
    })

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ backgroundColor: '#708090' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Stock Management Systems
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Permission?.map((item, idx) => {
            const findRole = item?.role?.find((item) => item === users?.role)
            return findRole ? (
              <ListItem key={idx} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate(item?.href)
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item?.title === 'Dashboard' ? (
                      <DashboardIcon />
                    ) : item?.title === 'ผู้ใช้งานระบบ' ? (
                      <AccountCircleIcon />
                    ) : item?.title === 'สินค้า' ? (
                      <ProductionQuantityLimitsIcon />
                    ) : item?.title === 'คลังสินค้า' ? (
                      <InventoryIcon />
                    ) : item?.title === 'รายการสินค้า' ? (
                      <DepartureBoardIcon />
                    ) : item?.title === 'สาขา' ? (
                      <CategoryIcon />
                    ) : item?.title === 'รายการเพิ่มสินค้า' ? (
                      <DescriptionRoundedIcon />
                    ) : item?.title === 'ประวัติการจัดส่ง' ? (
                      <DescriptionRoundedIcon />
                    ) : (
                      ''
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={item?.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : null
          })}
          <ListItemButton
            className="logout-btn"
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => {
              logout()
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LogoutIcon />
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 10, height: '100vh' }}>
        <Outlet />
      </Box>
      <ToastContainer />
    </Box>
  )
}
