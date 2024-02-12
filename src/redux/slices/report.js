import { createSlice } from "@reduxjs/toolkit";
export const reportStockSlice = createSlice({
    name: "report",
    initialState: {
        dataReportList: []
    },
    reducers: {
        setdataReportList: (state, action) => {
            state.dataReportList = action.payload
        },
        setEmpty: (state) => {
            state.dataReportList = []
        }
    },
});

export const { setdataReportList, setEmpty } = reportStockSlice.actions;
export default reportStockSlice.reducer;
