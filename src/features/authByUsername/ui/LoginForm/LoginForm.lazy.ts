// lazy loading page
import {FC, lazy} from "react";
import {LoginFormProps} from "features/authByUsername/ui/LoginForm/LoginForm";


//  we use memo() in LoginForm and we can't get props without <FC<LoginFormProps>>
export const LoginFormLazy =
    // lazy loading
    lazy<FC<LoginFormProps>>(() => new Promise((resolve, reject) => {
        setTimeout(() => {
            // @ts-ignore
            resolve(import("./LoginForm"));
        }, 1500);
    }));