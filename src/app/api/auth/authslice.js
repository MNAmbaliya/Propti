/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit'
import { register, signin, signout, autosignin} from './actions'

const PREFIX = 'auth'

const STATUS = {
    INITIAL: 0,
    FULFILLED: 1,
    PENDING: 2,
    REJECTED: 3
}

const isPendingAction = (action) => 
    action.type.startsWith(`${PREFIX}/`) && action.type.endsWith("pending")
const isRejectedAction = (action) => 
    action.type.startsWith(`${PREFIX}/`) && action.type.endsWith("rejected")

export const AuthSlice = createSlice(
    {
        name: "AUTH",
        initialState:{
            user: {  
            },
            status: STATUS.INITIAL
        },
        reducers:{},
        extraReducers:(builder) => {
            builder
                .addCase(
                   register.fulfilled,
                   (state, action) => {
                       state.user = action.payload,
                       state.status = STATUS.FULFILLED
                   } 
                )
                .addCase(
                    signin.fulfilled,
                    (state, action) => {
                        state.user = action.payload
                        state.status = STATUS.FULFILLED
                    } 
                )
                .addCase(
                    signout.fulfilled,
                    (state, action)=>{
                        state.user = action.payload;
                    }
                )
                .addCase(
                    autosignin.fulfilled,
                    (state, action)=>{
                        state.user = action.payload;
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
)

export { register, signin, signout, autosignin}
export default AuthSlice.reducer