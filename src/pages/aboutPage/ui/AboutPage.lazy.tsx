import {lazy} from "react";


// lazy loading page
export const AboutPageLazy =
    lazy(() => new Promise((resolve, reject) => {
        setTimeout(() => {
            // @ts-ignore
            resolve(import("./AboutPage"));
        }, 1500);
    }));