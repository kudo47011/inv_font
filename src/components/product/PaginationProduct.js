import { Pagination, Button, IconButton } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Swal from 'sweetalert2'
import Moment from 'react-moment'

import ProductService from '../../service/ProductService'
import PopupEditProduct from './PopupEditProduct'
import { useSelector } from 'react-redux'
import PopupRequestProduct from '../stock/PopupRequestProduct'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const PaginationProduct = ({ data, itemsPerPage, fetch }) => {
  const { users } = useSelector((state) => state.users)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = data.slice(startIndex, endIndex)

  const [openModal, setOpenModal] = useState(false)
  const [openModalRequest, setOpenModalRequest] = useState(false)

  const [selectData, setSelectData] = useState({})

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  const remove = (id) => {
    ProductService.deleteProduct(id)
      .then((response) => {
        Swal.fire({
          title: 'ทำรายการสำเร็จ',
          icon: 'success',
        })
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

  return (
    <div>
      <TableContainer
        style={{ boxShadow: 'none' }}
        className="table-container"
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                รูปภาพ
              </TableCell>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                ชื่อ
              </TableCell>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                สร้างโดย
              </TableCell>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                อัพเดตล่าสุด
              </TableCell>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                เครื่องมือ
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <img
                      style={{ width: '50%', height: '100%' }}
                      src={`${process.env.REACT_APP_ENDPOINT}/images/${row?.image}`}
                    />
                  </div>
                </TableCell>
                <TableCell align="center">{row?.name}</TableCell>
                <TableCell align="center">
                  {row?.user_created?.firstname}
                </TableCell>
                <TableCell align="center">
                  <Moment format="YYYY/MM/DD HH:mm:ss">{row?.updatedAt}</Moment>
                </TableCell>
                <TableCell align="center">
                  {users?.role == 'admin' && (
                    <div>
                      <IconButton
                        style={{ marginRight: '7px' }}
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          setSelectData(row)
                          setOpenModal(!openModal)
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        style={{ marginRight: '7px' }}
                        variant="contained"
                        color="error"
                        onClick={() => {
                          remove(row?._id)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                  {users?.role == 'manager' && (
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => {
                        setSelectData(row)
                        setOpenModalRequest(!openModalRequest)
                      }}
                    >
                      แจ้งเพิ่มสินค้า
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
      <PopupEditProduct
        isOpen={openModal}
        onClose={() => {
          setOpenModal(!openModal)
        }}
        selectedData={selectData}
        fetchProduct={fetch}
      />
      <PopupRequestProduct
        isOpen={openModalRequest}
        onClose={() => {
          setOpenModalRequest(!openModalRequest)
        }}
        product={selectData?._id}
      />
    </div>
  )
}

export default PaginationProduct
