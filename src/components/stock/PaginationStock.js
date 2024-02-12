import { Pagination, Button } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useSelector } from 'react-redux'
import PopupRequestProduct from './PopupRequestProduct'
import PopupEditStock from './PopupEditStock'
import Moment from 'react-moment'

const PaginationStock = ({ data, itemsPerPage, fetch }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { users } = useSelector((state) => state.users)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = data.slice(startIndex, endIndex)

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalRequest, setOpenModalRequest] = useState(false)
  const [selectData, setSelectData] = useState({})

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
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
                ชื่อสินค้า
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
                จำนวน
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
                      src={`${process.env.REACT_APP_ENDPOINT}/images/${row?.product?.image}`}
                    />
                  </div>
                </TableCell>
                <TableCell align="center">{row?.product?.name}</TableCell>
                <TableCell align="center">{row?.branch?.name}</TableCell>
                <TableCell align="center">{row?.amount}</TableCell>
                <TableCell align="center">
                  <Moment format="YYYY/MM/DD HH:mm:ss">{row?.updatedAt}</Moment>
                  </TableCell>
                <TableCell align="center">
                  {users?.role == 'admin' && (
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => {
                        setSelectData(row)
                        setOpenModalEdit(!openModalEdit)
                      }}
                    >
                      แก้ไขจำนวน
                    </Button>
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
      <PopupEditStock 
        amount={selectData?.amount}
        fetch={fetch}
        inv_id={selectData?._id}
        isOpen={openModalEdit}
        onClose={() => {
          setOpenModalEdit(!openModalEdit)
        }}
      />
      <PopupRequestProduct
        isOpen={openModalRequest}
        onClose={() => {
          setOpenModalRequest(!openModalRequest)
        }}
        product={selectData?.product?._id}
        isHaveBranch={true}
      />
    </div>
  )
}

export default PaginationStock
