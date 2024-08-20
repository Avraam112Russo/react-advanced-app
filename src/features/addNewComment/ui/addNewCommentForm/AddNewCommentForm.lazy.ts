

// lazy loading
import {FC, lazy} from "react";
import {AddNewCommentFormProps} from "features/addNewComment/ui/addNewCommentForm/AddNewCommentForm";



//usage <FC<AddNewCommentFormProps>> we can set props in ArticleDetailsPage.tsx
export const AddNewCommentFormLazy =
    lazy<FC<AddNewCommentFormProps>>(() => new Promise((resolve, reject) => {


        // timeout for tutorial project, antipattern
        setTimeout(() => {
            // @ts-ignore
            resolve(import("./AddNewCommentForm"));
        }, 1500);
    }));