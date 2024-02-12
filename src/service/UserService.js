import axios from 'axios'
import { getStorage } from '../utils/utils'

const ENDPOINT = {
  USER: {
    FIND_USER: `${process.env.REACT_APP_ENDPOINT}/user/find`,
    FIND_ALL_USER: `${process.env.REACT_APP_ENDPOINT}/user/all`,
    CREATE_USER: `${process.env.REACT_APP_ENDPOINT}/user`,
    DELETE_USER: (id) => `${process.env.REACT_APP_ENDPOINT}/user/${id}`,
    UPDATE_USER: (id) => `${process.env.REACT_APP_ENDPOINT}/user/${id}`,
    NEW_PASSWORD: (id) => `${process.env.REACT_APP_ENDPOINT}/user/new-password/${id}`,
  },
}

const UserService = {
  findUser: () => {
    return axios({
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${getStorage('accessToken')}`,
      },
      url: ENDPOINT.USER.FIND_USER,
    })
  },
  findAllUser: () => {
    return axios({
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${getStorage('accessToken')}`,
      },
      url: ENDPOINT.USER.FIND_ALL_USER,
    })
  },
  createUser: (data) => {
    return axios({
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${getStorage('accessToken')}`,
      },
      url: ENDPOINT.USER.CREATE_USER,
      data,
    })
  },
  editUser: (id, data) => {
    return axios({
      method: 'PATCH',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${getStorage('accessToken')}`,
      },
      url: ENDPOINT.USER.UPDATE_USER(id),
      data,
    })
  },
  newPassword: (id, data) => {
    return axios({
      method: 'PATCH',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${getStorage('accessToken')}`,
      },
      url: ENDPOINT.USER.NEW_PASSWORD(id),
      data,
    })
  },
  deleteUser: (id) => {
    return axios({
      method: 'DELETE',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${getStorage('accessToken')}`,
      },
      url: ENDPOINT.USER.DELETE_USER(id),
    })
  },
}

export default UserService
