import {createAsyncThunk} from "@reduxjs/toolkit";
import {Profile} from "entities/profile";
import {ThunkConfig} from "app/providers/storeProvider/config/StateSchema";
import {getProfileFormAndData} from "entities/profile/model/selectors/getProfileData/getProfileFormAndData";
import {validateProfile} from "entities/profile/model/services/validateProfile/ValidateProfile";
import {VALIDATE_PROFILE_ERROR} from "entities/profile/model/types/profile";


// async request to backend
export const UpdateProfileData =

    // 1 arg -> return type, 2 arg -> type of arg, 3 arg -> type of error, extra
    createAsyncThunk<Profile, void, ThunkConfig<VALIDATE_PROFILE_ERROR[]>>(
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
                const profile_id = formData?.id;
                const response = await extra.api.put<Profile>("/profile/" + profile_id, formData)

                const data = response.data;
                const validateProfileErrors = validateProfile(data);
                if (validateProfileErrors.length > 0){
                    return rejectWithValue(validateProfileErrors)
                }
                return data
            }catch (error){
                console.log("VALIDATE_PROFILE_ERROR SERVER_ERROR_500: " + error);
                rejectWithValue([VALIDATE_PROFILE_ERROR.SERVER_ERROR_500]);
            }
        },
    )