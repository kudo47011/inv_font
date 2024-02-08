import axios from "axios";

const ENDPOINT = {
    BRANCH: {
        FIND_BRANCH: `${process.env.REACT_APP_ENDPOINT}/branch`
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
}

export default BranchService;
