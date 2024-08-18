import {User, UserSchema} from "entities/user";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {LOCAL_STORAGE_USER_KEY} from "shared/global_const/local_storage";
import {Profile, ProfileSchema} from "entities/profile";
import {FetchProfileData} from "entities/profile/model/services/fetchProfileData/FetchProfileData";
import {UpdateProfileData} from "entities/profile/model/services/updateProfileData/UpdateProfileData";

const initialState:ProfileSchema = {
    readonly: true,
    isLoading: false,
    data: undefined,
    error:undefined,
}


export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

        // readOnly for inputs user profile
        setReadOnly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload
        },

        //update user profile data
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.data, // set old data
                ...action.payload // and also set new data
            }
        },

        // user make changes in input, but then cancel it, and we return in first state
         cancelEdit: (state) => {
            state.readonly = true
            state.form = state.data // return data which we get from server
            state.validateError=undefined;
        },
    },


    // for async change state
    extraReducers: (builder) => {
        builder

            // pending == request in process
            .addCase(FetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })

            // fulfilled == request is successfully complete
            .addCase(FetchProfileData.fulfilled, (
                state,
                action: PayloadAction<Profile>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly=true;
            })

            // rejected == request return error
            .addCase(FetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })





            // pending == request in process
            .addCase(UpdateProfileData.pending, (state) => {
                state.validateError = undefined;
                state.isLoading = true;
            })

            // fulfilled == request is successfully complete
            .addCase(UpdateProfileData.fulfilled, (
                state,
                action: PayloadAction<Profile>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.validateError = undefined;
            })

            // rejected == request return error
            .addCase(UpdateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateError = action.payload;

            })
    },
})

export const {actions: ProfileActions} = ProfileSlice;
export const {reducer: ProfileReducer} = ProfileSlice;

export default ProfileSlice.reducer