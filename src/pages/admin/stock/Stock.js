import React from 'react'
import BranchService from '../../../service/BranchService'
import { Button } from '@mui/material'
import { useState, useEffect } from 'react'
export default function Stock() {
  const [branchList, setBranchList] = useState([])

  useEffect(() => {
    fetchBranch()
  }, [])

  const fetchBranch = () => {
    BranchService.findBranch().then(({ data }) => {
      setBranchList(data)
    })
  }

  const xxx = (data) => {
    console.log(data)
  }
  return (
    <div>
      {
        branchList.map((item, index) => 
          (
            <Button key={index} variant="contained" onClick={() => {xxx(item)}}>{item.name}</Button>
          )
        )
      }
    </div>
  )
}
