import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {CounterSchema} from "entities/counter/model/types/CounterSchema";
import {UserSchema} from "entities/user/model/type/User";
import {LoginSchema} from "features/authByUsername/model/types/LoginSchema";
import {loginByUsername} from "features/authByUsername/model/services/loginByUsername/LoginByUsername";
import {SaveScrollSchema} from "features/scrollSave";

const initialState:SaveScrollSchema = {
    scroll: {}
}

export const scrollSaveSlice = createSlice({
    name: 'scrollSave',
    initialState,


    reducers: {
        setScrollPosition: (state, {payload}: PayloadAction<{path:string; position:number}>) => {
            state.scroll[payload.path] = payload.position
}
    },
})

export const {actions: scrollSaveActions} = scrollSaveSlice;
export const {reducer: scrollSaveReducer} = scrollSaveSlice;

