import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRegister, userSignIn, userSignOut} from "."

export const register = createAsyncThunk(
   "auth/register",
   async(requestBody) => {
       const response = await userRegister(requestBody);
       return response.data;
   }
);

export const signin = createAsyncThunk(
    "auth/signin",
    async(requestBody) => {
        const response = await userSignIn(requestBody);
        
        const tokens = JSON.stringify(response.data.token)
        localStorage.setItem("tokens", tokens);
        localStorage.setItem("userId", response.data.user_data.id);
        if(response == "false"){
            return false;
        }else{
            return response.data;
        }
        
    }
)

export const signout = createAsyncThunk(
    "auth/signout",
    async()=>{
        const response = await userSignOut(localStorage.getItem("tokens"));
        return response
    }
)

export const autosignin = createAsyncThunk(
    "auth/autosignin",
    async(requestBody)=>{
        const data= {
            user: requestBody.user,
            tokens: requestBody.tokens
        }
        return data
    }
)
