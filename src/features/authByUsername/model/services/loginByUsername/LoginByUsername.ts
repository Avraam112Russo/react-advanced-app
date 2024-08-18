import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {User, userActions} from "entities/user";
import {useTranslation} from "react-i18next";
import i18n from "shared/config/i18n/i18n";
import {LOCAL_STORAGE_USER_KEY} from "shared/global_const/local_storage";
import {ThunkConfig} from "app/providers/storeProvider/config/StateSchema";


export interface RequestLoginToApiProps {
    username: string,
    password: string,
}


// async request to api
export const loginByUsername =

    // User - return value from backend, RequestLoginToApiProps - value for request, {rejectValue: string} - override type for error
    // see createAsyncThunk -> AsyncThunkConfig
    createAsyncThunk<User, RequestLoginToApiProps, ThunkConfig<string>>(
    'login/loginByUsername',
        async ({username, password}:RequestLoginToApiProps, thunkAPI) => {
            // const {t} = useTranslation();
            const {
                extra,
                dispatch,
                rejectWithValue
            } = thunkAPI;

        try {

            // user -> return type // thunkApi.extra.api we set axios in store.ts
            // @ts-ignore
            const response = await extra.api.post<User>("/login", {username, password})

            // if backend return empty response
            if (!response.data){
                throw new Error("Empty data return from backend")
            }
            // convert response from json to string and set in local storage
            // in real project we will store JWT token
            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(response.data))
            // set username and id in state after successfully authentication
            dispatch(userActions.setAuthData(response.data))
            // redirect to /profile after login successfully
            extra.navigate('/profile')
            return response.data
        }catch (error){
            console.log("Something went wrong: " + error);
            rejectWithValue(i18n.t('Неверный логин или пароль'));
        }
    },
)