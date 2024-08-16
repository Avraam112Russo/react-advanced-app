import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {CounterSchema} from "entities/counter/model/types/CounterSchema";
import {User, UserSchema} from "entities/user/model/type/User";
import {LOCAL_STORAGE_USER_KEY} from "shared/global_const/local_storage";

const initialState:UserSchema = {}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        // reducer for set state after authentication
        setAuthData: (state, action: PayloadAction<User>) => {
            state.userAuthData = action.payload;
        },

        // reducer set state after user authentication, user close our app and again open, we check localstorage
        initAuthData: (state) => {
            const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
            if (user){
                state.userAuthData = JSON.parse(user);
            }
        },

        // reducer fpr user logout, clear state and remove token from local storage
        logout: (state) => {
            state.userAuthData = undefined;
            localStorage.removeItem(LOCAL_STORAGE_USER_KEY)

        }
    }
})

export const {actions: userActions} = userSlice;
export const {reducer: userReducer} = userSlice;

export default userSlice.reducer