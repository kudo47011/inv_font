import axios from "axios";
import { getStorage } from "../utils/utils"

const ENDPOINT = {
    TRANSACTION: {
        FIND_TRANSACTION: `${process.env.REACT_APP_ENDPOINT}/transaction/wait`,
        APPROVE: (id) => `${process.env.REACT_APP_ENDPOINT}/transaction/${id}`
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
    apperove: (id) => {
        return axios({
            method: "PATCH",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getStorage("accessToken")}`
            },
            url: ENDPOINT.TRANSACTION.APPROVE(id),
        })
    }
}

export default TransactionService;
