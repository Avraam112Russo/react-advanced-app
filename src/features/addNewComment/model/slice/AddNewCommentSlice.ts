import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {CounterSchema} from "entities/counter/model/types/CounterSchema";
import {UserSchema} from "entities/user/model/type/User";
import {LoginSchema} from "features/authByUsername/model/types/LoginSchema";
import {loginByUsername} from "features/authByUsername/model/services/loginByUsername/LoginByUsername";
import {AddNewCommentSchema} from "features/addNewComment";

const initialState:AddNewCommentSchema = {
    error:undefined,
    text:undefined
}

// main component in Redux toolkit
export const AddNewCommentSlice = createSlice({
    name: 'addNewComment',
    initialState,


    reducers: {
        setTextComment: (state, action: PayloadAction<string>) => {
            state.text = action.payload
        }
    },


    // extraReducers: (builder) => {
    //     builder
    //
    //         // pending == request in process
    //         .addCase(loginByUsername.pending, (state, action) => {
    //             state.error = undefined;
    //
    //         })
    //
    //         // fulfilled == request is successfully complete
    //         .addCase(loginByUsername.fulfilled, (state, action) => {
    //
    //
    //         })
    //
    //         // rejected == request return error
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //
    //             state.error = action.payload;
    //         })
    // },
})

export const {actions: AddNewCommentAction} = AddNewCommentSlice;
export const {reducer: AddNewCommentReducer} = AddNewCommentSlice;

