import * as React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts'
import { useEffect, useState } from 'react'
import InventoryService from '../../service/InventoryService'

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 1000,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
}

const defaultDataSet = [
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
    day: '2024/02/06',
  },
]

const valueFormatter = (value) => `${value}`

const BarsDataset = ({ data }) => {
  const [rp, setRp] = useState([])
  const [s, setSeries] = useState([])

  console.log(data)

  const dataReport = [
    {
      data_of_date: '2024/02/06',
      branch: [
        {
          name: 'ชุมแพ',
          amount: 100,
        },
        {
          name: 'ขอนแก่น',
          amount: 150,
        },
      ],
    },
    {
      data_of_date: '2024/02/07',
      branch: [
        {
          branch: {
            name: 'ชุมแพ',
          },
          amount: 172,
        },
        {
          name: 'ขอนแก่น',
          amount: 30,
        },
        {
          name: 'ชัยภูมิ',
          amount: 50,
        },
      ],
    },
  ]

  const formatData = () => {
    let dataSetChart = []
    for (let index = 0; index < data.length; index++) {
      let a = {}
      if (data[index].branch.length != 0) {
        for (let item of data[index].branch) {
          a[`${item?.branch?.name}`] = item?.amount
        }
      }
      a.date = data[index].data_of_date
      dataSetChart.push(a)
    }

    console.log("dataSetChart:::", dataSetChart);
    setRp(dataSetChart)

    let series = []
    for (let item of dataSetChart) {
      let keys = Object.keys(item)
        console.log("dataSetChart:::", dataSetChart);
      if (keys.length != 0) {
        const sl = keys.slice(0, -1)
        if (sl.length != 0) {
          for (let item of sl) {
            series.push({
              dataKey: item,
              label: item,
              valueFormatter,
            })
          }
        }
      }
    }
    console.log('series:::', series);
    if (series.length != 0) {
      const seenKeys = new Set()
      const uniqueArr = series.filter((obj) => {
        if (seenKeys.has(obj.label)) {
          return false // Duplicate key, exclude from the filtered array
        }
        seenKeys.add(obj.label)
        return true // Unique key, include in the filtered array
      })
        console.log('uniqueArr:::', uniqueArr);
      setSeries(uniqueArr)
    }
  }

  useEffect(() => {
    formatData()
  }, [])

  let arr = [
    { dataKey: 'london', label: 'London', valueFormatter },
    { dataKey: 'paris', label: 'Paris', valueFormatter },
    { dataKey: 'newYork', label: 'New York', valueFormatter },
    { dataKey: 'seoul', label: 'Seoul', valueFormatter },
  ]

  return (
    <BarChart
      dataset={rp}
      xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
      series={s}
      {...chartSetting}
    />
  )
}

export default BarsDataset
