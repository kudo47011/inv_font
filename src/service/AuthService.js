import axios from "axios";

const ENDPOINT = {
    AUTH: {
        LOGIN: `${process.env.REACT_APP_ENDPOINT}/login`
    },
};

const AuthService = {
    login: (data) => {
        return axios({
            method: "POST",
            headers:{
                "ngrok-skip-browser-warning": "69420",
            },
            url: ENDPOINT.AUTH.LOGIN,
            data
        })
    },
}

export default AuthService;
