import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {CounterSchema} from "entities/counter/model/types/CounterSchema";
import {UserSchema} from "entities/user/model/type/User";
import {LoginSchema} from "features/authByUsername/model/types/LoginSchema";
import {loginByUsername} from "features/authByUsername/services/loginByUsername/LoginByUsername";

const initialState:LoginSchema = {
    isLoading:false,
    username:'',
    password:''
}

// main component in Redux toolkit
export const loginSlice = createSlice({
    name: 'login',
    initialState,


    // for simple change state
    reducers: {

        // change data in state
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },


    // for async change state
    extraReducers: (builder) => {
        builder

            // pending == request in process
            .addCase(loginByUsername.pending, (state, action) => {
                    state.error = undefined;
                    state.isLoading = true;
            })

            // fulfilled == request is successfully complete
            .addCase(loginByUsername.fulfilled, (state, action) => {
                    state.isLoading = false;

            })

            // rejected == request return error
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
})

export const {actions: loginActions} = loginSlice;
export const {reducer: loginReducer} = loginSlice;

