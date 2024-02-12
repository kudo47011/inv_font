import React, { Suspense } from 'react'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

/// Guard
import JWTGuard from './guard/JWTGuard'
import RoleGuard from './guard/RoleGuard'

/// Page
import Dashboard from './pages/admin/Dashboard'
import Login from './pages/Login'
import Layout from './components/Layout'
import Branch from './pages/admin/branch/Branch'
import User from './pages/admin/user/User'
import Product from './pages/admin/product/Product'
import Stock from './pages/admin/stock/Stock'
import Transaction from './pages/admin/transaction/Transaction'
import TransactionManager from './pages/admin/transaction/TransactionManager'
import DriverHistory from './pages/admin/driver_history/DriverHistory'

///MUI
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'

let persistor = persistStore(store)

const theme = createTheme({
  typography: {
    fontFamily: 'Kanit, sans-serif',
  },
})

export default function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <JWTGuard>
                    <RoleGuard>
                      <Layout />
                    </RoleGuard>
                  </JWTGuard>
                }
              >
                <Route index element={<Dashboard /> } />
                <Route path="/dashboard/branch" element={<Branch />} />
                <Route path="/dashboard/user" element={<User />} />
                <Route path="/dashboard/product" element={<Product />} />
                <Route path="/dashboard/stock" element={<Stock />} />
                <Route
                  path="/dashboard/transaction"
                  element={<Transaction />}
                />
                <Route
                  path="/dashboard/transaction-manager"
                  element={<TransactionManager />}
                />
                <Route
                  path="/dashboard/transaction-history"
                  element={<DriverHistory />}
                />
                <Route path="/dashboard/branch" element={<Branch />} />
                <Route path="*" element={<p>ไม่เจอ</p>} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </PersistGate>
        </ThemeProvider>
      </Provider>
    </Suspense>
  )
}
