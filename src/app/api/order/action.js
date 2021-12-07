import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadReportFromDB } from ".";

export const loadReport = createAsyncThunk(
    "order/loadReport",
    async(address) => {
        const response = await loadReportFromDB(address);
        return response.data;
    }
)