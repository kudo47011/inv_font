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
import Button from '@mui/material/Button'

const PaginationTransaction = ({ data, itemsPerPage }) => {
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
      {/*Render your data list or table*/}
      <TableContainer className='table-container' component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ชื่อผลิตภัณฑ์</TableCell>
              <TableCell align="right" width={300}>จำนวน</TableCell>
              <TableCell align="right" width={300}>สาขา</TableCell>
              <TableCell align="right" width={300}>สถานะ</TableCell>
              <TableCell align="right" width={300}>เครื่องมือ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.branch}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  {row.status === 'Waiting' && (
                    <>
                      <Button variant="contained" color="success" onClick={console.log(555)}>
                        อนุมัติ
                      </Button>{' '}
                      <Button variant="outlined" color="error">
                        ไม่อนุมัติ
                      </Button>
                    </>
                  )}
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

export default PaginationTransaction
