import axios from "axios";
import { getStorage } from "../utils/utils"

const ENDPOINT = {
    TRANSACTION: {
        FIND_TRANSACTION: `${process.env.REACT_APP_ENDPOINT}/transaction/wait`,
        FIND_INPROGRESS_TRANSACTION: `${process.env.REACT_APP_ENDPOINT}/transaction/progress`,
        FIND_SUCCESS_TRANSACTION: `${process.env.REACT_APP_ENDPOINT}/transaction/success`,
        APPROVE: (id) => `${process.env.REACT_APP_ENDPOINT}/transaction/${id}`,
        CANCEL: (id) => `${process.env.REACT_APP_ENDPOINT}/transaction/${id}`,
    },
};

const TransactionService = {
    findTransaction: () => {
        return axios({
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getStorage("accessToken")}`
            },
            url: ENDPOINT.TRANSACTION.FIND_TRANSACTION,
        })
    },
    findInprogressTransaction: () => {
        return axios({
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getStorage("accessToken")}`
            },
            url: ENDPOINT.TRANSACTION.FIND_INPROGRESS_TRANSACTION,
        })
    },
    findSuccessTransaction: () => {
        return axios({
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getStorage("accessToken")}`
            },
            url: ENDPOINT.TRANSACTION.FIND_SUCCESS_TRANSACTION,
        })
    },
    approve: (id) => {
        return axios({
            method: "PATCH",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getStorage("accessToken")}`
            },
            url: ENDPOINT.TRANSACTION.APPROVE(id),
        })
    },
    success: (id) => {
        return axios({
            method: "POST",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getStorage("accessToken")}`
            },
            url: ENDPOINT.TRANSACTION.APPROVE(id),
        })
    },
    cancel: (id) => {
        return axios({
            method: "DELETE",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getStorage("accessToken")}`
            },
            url: ENDPOINT.TRANSACTION.CANCEL(id),
        })
    }
}

export default TransactionService;
