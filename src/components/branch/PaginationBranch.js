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
import BranchService from '../../service/BranchService'
import Swal from 'sweetalert2'
import PopupEditBranch from '../branch/PopupEditBranch'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const PaginationBranch = ({ data, itemsPerPage, fetch }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = data.slice(startIndex, endIndex)

  const [openModal, setOpenModal] = useState(false)
  const [selectData, setSelectData] = useState({})

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  const remove = (id) => {
    BranchService.deleteBranch(id)
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
                ชื่อ
              </TableCell>
              <TableCell
                align="center"
                width={300}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                ผู้จัดการสาขา
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
                <TableCell align="center">{row?.name}</TableCell>
                <TableCell align="center">
                  {row?.manager?.firstname + ' ' + row?.manager?.lastname}
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    style={{marginRight: '7px'}}
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
                    variant="contained"
                    color="error"
                    onClick={() => {
                      remove(row?._id)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*Pagination component*/}
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
      <PopupEditBranch
        isOpen={openModal}
        exit={() => {
          setOpenModal(!openModal)
        }}
        selectData={selectData}
        fetch={fetch}
      />
    </div>
  )
}

export default PaginationBranch
