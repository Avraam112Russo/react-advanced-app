import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {CounterSchema} from "entities/counter/model/types/CounterSchema";
import {UserSchema} from "entities/user/model/type/User";

const initialState:UserSchema = {}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { }
})

export const {actions: userActions} = userSlice;
export const {reducer: userReducer} = userSlice;

export default userSlice.reducer