import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {},
        authentication: false,
        usersList: []
    },
    reducers: {
        setAuthentication: (state, action) => {
            state.users = action.payload
            state.authentication = true
        },
        setLogOut: (state) => {
            state.authentication = false;
            state.users = {};
        },
        setUserList: (state, action) => {
            state.usersList = action.payload
        }
    },
});

export const { setAuthentication, setLogOut, setUserList } = userSlice.actions;
export default userSlice.reducer;
