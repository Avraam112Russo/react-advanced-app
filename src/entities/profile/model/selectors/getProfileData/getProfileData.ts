import {StateSchema} from "app/providers/storeProvider";

export const GetProfileData = (state: StateSchema) => state?.profile?.data;