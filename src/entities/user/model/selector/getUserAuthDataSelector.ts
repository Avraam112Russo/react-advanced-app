import {StateSchema} from "app/providers/storeProvider";

export const getUserAuthDataSelector = (state:StateSchema) => state?.user.userAuthData