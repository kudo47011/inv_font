import axios from 'axios'
import { getStorage } from '../utils/utils'

const ENDPOINT = {
  INVENTORY: {
    FIND_STOCK_BY_BRANCH: (id) => `${process.env.REACT_APP_ENDPOINT}/inventory/branch/${id}`,
    EDIT_STOCK: (id) => `${process.env.REACT_APP_ENDPOINT}/inventory/${id}`,
    REPORT: (id) => `${process.env.REACT_APP_ENDPOINT}/inventory/report/${id}`,
  },
}

const InventoryService = {
    editStock: (id, data) => {
      return axios({
        method: 'PATCH',
        headers: {
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${getStorage('accessToken')}`,
        },
        url: ENDPOINT.INVENTORY.EDIT_STOCK(id),
        data,
      })
    },
    findStockByBranch: (id) => {
      return axios({
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${getStorage('accessToken')}`,
        },
        url: ENDPOINT.INVENTORY.FIND_STOCK_BY_BRANCH(id),
      })
    },
    report: (id) => {
      return axios({
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${getStorage('accessToken')}`,
        },
        url: ENDPOINT.INVENTORY.REPORT(id),
      })
    },
  }
  
  export default InventoryService