import {StateSchema} from "app/providers/storeProvider";

export const GetProfileIsLoading = (state: StateSchema) => state?.profile?.isLoading;
