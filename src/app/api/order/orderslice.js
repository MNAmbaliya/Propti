/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import { loadReport } from "./action"

const STATUS = {
    INITIAL: 0,
    FULFILLED: 1,
    PENDING: 2,
    REJECTED: 3
}
const PREFIX = 'order'

const isPendingAction = (action) => 
    action.type.startsWith(`${PREFIX}/`) && action.type.endsWith("pending")
const isRejectedAction = (action) => 
    action.type.startsWith(`${PREFIX}/`) && action.type.endsWith("rejected")

export const OrderSlice = createSlice(
    {
        name: 'ORDER',
        initialState:{
            finded: {  
            },
            status: STATUS.INITIAL
        },
        reducers:{},
        extraReducers:(builder) => {
            builder.addCase(
                loadReport.fulfilled,
                (state, action) => {
                    state.finded = action.payload,
                    state.status = STATUS.FULFILLED
                } 
            )
            .addMatcher(
                isPendingAction,
               (state) => {
                    state.status = STATUS.PENDING
               } 
            )
            .addMatcher(
                isRejectedAction,
                (state) => {
                    state.status = STATUS.REJECTED
                }
            )
        }
    }
);

export default OrderSlice.reducer