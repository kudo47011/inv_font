import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {},
        authentication: false,
    },
    reducers: {
        setAuthentication: (state, action) => {
            state.users = action.payload
            state.authentication = true
        },
        setLogOut: (state) => {
            state.authentication = false;
            state.users = {};
        }
    },
});

export const { setAuthentication, setLogOut } = userSlice.actions;
export default userSlice.reducer;
