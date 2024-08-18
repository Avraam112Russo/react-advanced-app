import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {User, userActions} from "entities/user";
import {useTranslation} from "react-i18next";
import i18n from "shared/config/i18n/i18n";
import {LOCAL_STORAGE_USER_KEY} from "shared/global_const/local_storage";
import {Profile} from "entities/profile";
import {ThunkConfig} from "app/providers/storeProvider/config/StateSchema";





// async request to api
export const FetchProfileData =

    //
    createAsyncThunk<Profile, void, ThunkConfig<string>>(
        'profile/fetchProfileData',



        // _ mean that we don't have argument
        //@ts-ignore
        async (_, thunkAPI) => {
            // const {t} = useTranslation();
            const {
                extra,
                rejectWithValue
            } = thunkAPI;

            try {

                const response = await extra.api.get<Profile>("/profile")

                const data = response.data;
                console.log(data)
                return data
            }catch (error){
                console.log("Something went wrong: " + error);
                rejectWithValue(i18n.t('Неверный логин или пароль'));
            }
        },
    )