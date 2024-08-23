import {lazy} from "react";

export const ArticleDetailsEditPageLazy =
    lazy(() => new Promise((resolve, reject) => {


        // timeout for tutorial project, antipattern
        setTimeout(() => {
            // @ts-ignore
            resolve(import("./ArticleDetailsEditPage"));
        }, 300);
    }));
