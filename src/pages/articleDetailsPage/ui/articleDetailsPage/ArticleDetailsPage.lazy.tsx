import {lazy} from "react";

const ArticleDetailsPageLazy =
    lazy(() => new Promise((resolve, reject) => {


        // timeout for tutorial project, antipattern
        setTimeout(() => {
            // @ts-ignore
            resolve(import("./ArticleDetailsPage"));
        }, 300);
    }));
export default ArticleDetailsPageLazy;