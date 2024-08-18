import {createAsyncThunk} from "@reduxjs/toolkit";
import {Profile} from "entities/profile";
import {ThunkConfig} from "app/providers/storeProvider/config/StateSchema";
import i18n from "shared/config/i18n/i18n";
import {useSelector} from "react-redux";
import {getProfileFormAndData} from "entities/profile/model/selectors/getProfileData/getProfileFormAndData";



export const UpdateProfileData =

    //
    createAsyncThunk<Profile, void, ThunkConfig<string>>(
        'profile/updateProfileData',



        // _ mean that we don't have argument
        //@ts-ignore
        async (_, thunkAPI) => {
            // const {t} = useTranslation();
            const {
                extra,
                rejectWithValue,
                getState
            } = thunkAPI;

            try {
                // get data from inputs form
                const formData = getProfileFormAndData(getState());
                const response = await extra.api.put<Profile>("/profile", formData)

                const data = response.data;
                console.log(data)
                return data
            }catch (error){
                console.log("Something went wrong: " + error);
                rejectWithValue(i18n.t('Неверный логин или пароль'));
            }
        },
    )