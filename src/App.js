import React, { Suspense } from 'react'
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

/// Guard
import JWTGuard from "./guard/JWTGuard"
import RoleGuard from "./guard/RoleGuard"

/// Page
import Dashboard from "./pages/admin/Dashboard";
import Manage from "./pages/admin/Manage";
import Login from "./pages/Login";
import Layout from "./components/Layout"
import Branch from "./pages/admin/branch/Branch"
import User from "./pages/admin/user/User"
import Product from "./pages/admin/product/Product"
import Stock from "./pages/admin/stock/Stock"
import Transaction from "./pages/admin/transaction/Transaction"

let persistor = persistStore(store);

export default function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/dashboard" element={
              <JWTGuard>
                <RoleGuard>
                  <Layout />
                </RoleGuard>
              </JWTGuard>
            }>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard/branch" element={<Branch />} />
              <Route path="/dashboard/user" element={<User />} />
              <Route path="/dashboard/product" element={<Product />} />
              <Route path="/dashboard/stock" element={<Stock />} />
              <Route path="/dashboard/transaction" element={<Transaction />} />
              <Route path="/dashboard/branch" element={<Branch />} />
              <Route path="*" element={<p>ไม่เจอ</p>} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </PersistGate>
      </Provider>
    </Suspense>

  )
}
