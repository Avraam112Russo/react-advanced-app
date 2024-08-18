
import {lazy} from "react";

// lazy loading page
export const ProfilePageLazy =
    lazy(() => new Promise((resolve, reject) => {


        // timeout for tutorial project, antipattern
        setTimeout(() => {
            // @ts-ignore
            resolve(import("./ProfilePage"));
        }, 1500);
    }));