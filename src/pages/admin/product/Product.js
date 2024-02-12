import React from 'react'
import ProductService from '../../../service/ProductService'
import { useState, useEffect } from 'react'
import { Grid, Button } from '@mui/material'
import PopupCreateProduct from '../../../components/product/PopupCreateProduct'
import PaginationProduct from '../../../components/product/PaginationProduct'
import { useSelector } from 'react-redux'

export default function Product() {
  const [productsList, setProductsList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const { users } = useSelector((state) => state.users)

  const fetchProduct = () => {
    ProductService.findProduct().then(({ data }) => {
      setProductsList(data)
    })
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: '7px' }}>
        <Grid xs={6} item>
          <div
            style={{ fontSize: 20, fontWeight: 'bold', marginBottom: '7px' }}
          >
            รายการสินค้า
          </div>
        </Grid>
        <Grid xs={6} style={{ display: 'flex', justifyContent: 'end' }} item>
          {users?.role == 'admin' && (
            <Button color="success" variant="contained" onClick={handleToggle}>
              เพิ่มข้อมูลสินค้า
            </Button>
          )}
        </Grid>
      </Grid>
      <PaginationProduct
        data={productsList}
        itemsPerPage={10}
        fetch={() => {
          fetchProduct()
        }}
      />
      {isOpen && (
        <PopupCreateProduct
          fetchProduct={fetchProduct}
          isOpen={isOpen}
          onClose={handleToggle}
        />
      )}
    </div>
  )
}
