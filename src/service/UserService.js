import axios from "axios";
import { getStorage } from "../utils/utils"

const ENDPOINT = {
    USER: {
        FIND_USER: `${process.env.REACT_APP_ENDPOINT}/user/find`
    },
};

const UserService = {
    findUser: () => {
        return axios({
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getStorage("accessToken")}`
            },
            url: ENDPOINT.USER.FIND_USER,
        })
    },
}

export default UserService;
