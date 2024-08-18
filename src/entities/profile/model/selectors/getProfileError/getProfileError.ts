import {StateSchema} from "app/providers/storeProvider";

export const GetProfileError = (state: StateSchema) => state?.profile?.error;
