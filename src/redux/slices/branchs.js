import { createSlice } from "@reduxjs/toolkit";
export const branchSlice = createSlice({
    name: "branch",
    initialState: {
        branchList: [],
        branch: "",
    },
    reducers: {
        setbranchList: (state, action) => {
            state.branchList = action.payload
        },
        setSelectedBranch: (state, action) => {
            state.branch = action.payload
        },
    },
});

export const { setbranchList, setSelectedBranch } = branchSlice.actions;
export default branchSlice.reducer;
