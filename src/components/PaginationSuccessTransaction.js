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

const PaginationSuccessTransaction = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = data.slice(startIndex, endIndex)

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  return (
    <div className="box-table-pagination">
      <div>รายการที่ทำรายการสำเร็จแล้ว</div>
      <TableContainer className="table-container" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ชื่อผลิตภัณฑ์</TableCell>
              <TableCell align="center" width={400}>
                จำนวน
              </TableCell>
              <TableCell align="center" width={300}>
                สาขา
              </TableCell>
              <TableCell align="center" width={300}>
                สถานะ
              </TableCell>
              <TableCell align="center" width={300}>
                ผู้ทำรายการ
              </TableCell>
              <TableCell align="center" width={300}>
                เวลา
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.product?.name}
                </TableCell>
                <TableCell align="center">{row?.amount}</TableCell>
                <TableCell align="center">{row?.branch?.name}</TableCell>
                <TableCell align="center">{'กำลังดำเนินการ'}</TableCell>
                <TableCell align="center">
                  {row?.user_created?.username}
                </TableCell>
                <TableCell align="center">
                  <Moment format="YYYY/MM/DD HH:MM:ss">{row?.updatedAt}</Moment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*Pagination component*/}
      <div className="pagination-box">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default PaginationSuccessTransaction
