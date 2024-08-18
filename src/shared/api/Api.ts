import axios from "axios";
import {LOCAL_STORAGE_USER_KEY} from "shared/global_const/local_storage";

// in prod mode we send request to the real server
const BASE_URL = "http://localhost:8080"
export const $API = axios.create({
    baseURL: BASE_URL,

    // our app just check header authorization exist or not 
    headers:{
        authorization: localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    }
})