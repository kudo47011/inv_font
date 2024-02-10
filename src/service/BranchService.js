import axios from "axios";
import { getStorage } from "../utils/utils"

const ENDPOINT = {
    BRANCH: {
        FIND_BRANCH: `${process.env.REACT_APP_ENDPOINT}/branch`,
        CREATE_BRANCH: `${process.env.REACT_APP_ENDPOINT}/branch`,
        DELETE_BRANCH: (id) => `${process.env.REACT_APP_ENDPOINT}/branch/${id}`,
        UPDATE_BRANCH: (id) => `${process.env.REACT_APP_ENDPOINT}/branch/${id}`
    },
};

const BranchService = {
    findBranch: () => {
        return axios({
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69420",
            },
            url: ENDPOINT.BRANCH.FIND_BRANCH,
        })
    },
    createBranch: (data) => {
        return axios({
            method: "POST",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getStorage("accessToken")}`
            },
            url: ENDPOINT.BRANCH.CREATE_BRANCH,
            data: data
        })
    },
    deleteBranch: (id) => {
        return axios({
            method: "DELETE",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getStorage("accessToken")}`
            },
            url: ENDPOINT.BRANCH.DELETE_BRANCH(id),
        })
    },
    updateBranch: (id, data) => {
        return axios({
            method: "PATCH",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getStorage("accessToken")}`
            },
            url: ENDPOINT.BRANCH.UPDATE_BRANCH(id),
            data
        })
    }
}

export default BranchService;
