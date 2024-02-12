import { Pagination } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Moment from 'react-moment'

const PaginationDriverHistory = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = data.slice(startIndex, endIndex)

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: '7px' }}>
        ประวัติการจัดส่งสินค้า
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
                สินค้า
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
                สาขาปลายทาง
              </TableCell>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                เวลาเริ่ม
              </TableCell>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                เวลาจบ
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
                  {row?.transaction?.product?.name}
                </TableCell>
                <TableCell align="center">{row?.transaction?.amount}</TableCell>
                <TableCell align="center">{row?.transaction?.branch?.name}</TableCell>
                <TableCell align="center">
                  <Moment format="YYYY/MM/DD HH:mm:ss">{row?.transaction?.createdAt}</Moment>
                </TableCell>
                <TableCell align="center">
                  <Moment format="YYYY/MM/DD HH:mm:ss">{row?.end_time}</Moment>
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

export default PaginationDriverHistory
