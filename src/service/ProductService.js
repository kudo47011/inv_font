import axios from 'axios'
import { getStorage } from '../utils/utils'

const ENDPOINT = {
  PRODUCT: {
    FIND_PRODUCT: `${process.env.REACT_APP_ENDPOINT}/product`,
    CREATE_PRODUCT: `${process.env.REACT_APP_ENDPOINT}/product`,
    DELETE_PRODUCT: (id) => `${process.env.REACT_APP_ENDPOINT}/product/${id}`,
    UPDATE_PRODUCT: (id) => `${process.env.REACT_APP_ENDPOINT}/product/${id}`,
  },
}

const ProductService = {
  createProduct: (data) => {
    return axios({
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${getStorage('accessToken')}`,
      },
      url: ENDPOINT.PRODUCT.CREATE_PRODUCT,
      data,
    })
  },
  findProduct: () => {
    return axios({
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${getStorage('accessToken')}`,
      },
      url: ENDPOINT.PRODUCT.FIND_PRODUCT,
    })
  },
  editProduct: (id, data) => {
    return axios({
      method: 'PATCH',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${getStorage('accessToken')}`,
      },
      url: ENDPOINT.PRODUCT.UPDATE_PRODUCT(id),
      data,
    })
  },
  deleteProduct: (id) => {
    return axios({
      method: 'DELETE',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${getStorage('accessToken')}`,
      },
      url: ENDPOINT.PRODUCT.DELETE_PRODUCT(id),
    })
  },
}

export default ProductService
