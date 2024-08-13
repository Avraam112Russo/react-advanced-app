import {lazy} from "react";


// lazy loading page
export const MainPageLazy =
    lazy(() => new Promise((resolve, reject) => {
    setTimeout(() => {
        // @ts-ignore
        resolve(import("./MainPage"));
    }, 1500);
}));