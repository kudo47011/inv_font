import React from 'react'
import BranchService from '../../../service/BranchService'
import { Button, IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import InventoryService from '../../../service/InventoryService'
import PaginationStock from '../../../components/stock/PaginationStock'
import { setSelectedBranch } from '../../../redux/slices/branchs'
import BarsDataset from '../../../components/dashboard/ChartEachDay'
import { setdataReportList } from '../../../redux/slices/report'

export default function Stock() {
  const { users } = useSelector((state) => state.users)
  const { dataReportList } = useSelector((state) => state.report)

  const dispatch = useDispatch()

  const [branchList, setBranchList] = useState([])
  const [selectedBranch, setSelectBranch] = useState()
  const [stockList, setStock] = useState([])

  const handleBranch = (e) => {
    setSelectBranch(e.target.value)
  }

  const fetchReport = () => {
    InventoryService.report(users?._id).then(({ data }) => {
      dispatch(setdataReportList(data))
    })
  }

  const search = () => {
    if (selectedBranch) {
      dispatch(setSelectedBranch(selectedBranch))
      InventoryService.findStockByBranch(selectedBranch).then(({ data }) => {
        setStock(data)
      })
    }
  }

  const fetchBranch = () => {
    BranchService.findBranchByManager(users._id).then(({ data }) => {
      setBranchList(data)
    })
  }

  useEffect(() => {
    fetchBranch()
    fetchReport()
  }, [])

  return (
    <div>
      {users?.role == 'admin' && (
        <Grid style={{ display: 'flex', justifyContent: 'center' }}>
          <BarsDataset data={dataReportList} />
        </Grid>
      )}
      <Grid
        container
        spacing={2}
        style={{ marginTop: '10px', marginBottom: '20px' }}
      >
        <Grid xs={10}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'start',
              marginTop: '10px',
            }}
          >
            สต๊อกสินค้า
          </div>
        </Grid>
        <Grid xs={2} style={{ display: 'flex' }}>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel>สาขา</InputLabel>
              <Select
                name="selectedBranch"
                value={selectedBranch}
                label="สาขา"
                onChange={handleBranch}
              >
                {branchList?.map((item, idx) => {
                  return (
                    <MenuItem
                      value={item?._id}
                      key={idx}
                    >{`${item?.name}`}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <IconButton size="large" onClick={search}>
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
      <PaginationStock
        data={stockList}
        itemsPerPage={10}
        fetch={() => {
          search()
        }}
      />
    </div>
  )
}
