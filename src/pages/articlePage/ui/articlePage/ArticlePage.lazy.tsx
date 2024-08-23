// lazy loading page
import {lazy} from "react";

 const ArticlePageLazy =
    lazy(() => new Promise((resolve, reject) => {


        // timeout for tutorial project, antipattern
        setTimeout(() => {
            // @ts-ignore
            resolve(import("./ArticlePage"));
        }, 400);
    }));
 export default ArticlePageLazy;