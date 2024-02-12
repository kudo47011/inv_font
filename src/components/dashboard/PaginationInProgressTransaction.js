import { IconButton, Pagination } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TransactionService from '../../service/TransactionService'
import Swal from 'sweetalert2'
import Moment from 'react-moment'

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { useSelector } from 'react-redux'

const PaginationProgressTransaction = ({
  data,
  itemsPerPage,
  fetch,
  fetch2,
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = data.slice(startIndex, endIndex)

  const { users } = useSelector((state) => state.users)

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  const loadMap = (lat, lng) => {
    console.log(lat)
    console.log(lng)
    window.open(`https://maps.google.com?q=${lat},${lng}`);
  }

  const success = (id) => {
    TransactionService.success(id)
      .then((response) => {
        Swal.fire({
          title: 'ทำรายการสำเร็จ',
          icon: 'success',
        })
        fetch()
        if (users?.role != 'driver') {
          fetch2()
        }
      })
      .catch((error) => {
        console.log(error);
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
      <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: '7px' }}>
        รายการสินค้าที่ต้องจัดส่ง
      </div>
      <TableContainer
        className="table-container"
        style={{ boxShadow: 'none' }}
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
                ชื่อผลิตภัณฑ์
              </TableCell>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                จำนวน
              </TableCell>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                สาขา
              </TableCell>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                สถานะ
              </TableCell>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                ผู้ทำรายการ
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
                <TableCell component="th" scope="row" align="center">
                  {row?.product?.name}
                </TableCell>
                <TableCell align="center">{row?.amount}</TableCell>
                <TableCell align="center">{row?.branch?.name}</TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: 'bold', color: '#CC6600' }}
                >
                  กำลังดำเนินการ
                </TableCell>
                <TableCell align="center">
                  {row?.user_created?.username}
                </TableCell>
                <TableCell align="center">
                  <Moment format="YYYY/MM/DD HH:mm:ss">{row?.updatedAt}</Moment>
                </TableCell>
                <TableCell align="center">
                  {users?.role == 'driver' && (
                    <IconButton
                      variant="contained"
                      color="success"
                      disabled={row?.status != 'In progress' ? true : false}
                      onClick={() => {
                        loadMap(row?.branch?.lat, row?.branch?.lng)
                      }}
                    >
                      <LocationOnRoundedIcon color="error" />
                    </IconButton>
                  )}
                  <IconButton
                    variant="contained"
                    color="success"
                    disabled={row?.status != 'In progress' ? true : false}
                    onClick={() => {
                      success(row?._id)
                    }}
                  >
                    <CheckCircleOutlineRoundedIcon color="success" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{ display: 'flex', justifyContent: 'end' }}
        className="pagination-box"
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default PaginationProgressTransaction
