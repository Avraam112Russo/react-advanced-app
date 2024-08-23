import {createSelector} from "@reduxjs/toolkit";
import {getArticleDetailsData} from "entities/singleArticle/model/selectors/ArticleDetailsSelector";
import {getUserAuthDataSelector} from "entities/user/model/selector/getUserAuthDataSelector";


export const getUserCanEditArticleSelector = createSelector(
    getUserAuthDataSelector, // get currently auth user
    getArticleDetailsData, // get currently single article page
    (user, article) => {
        if (!user || !article){
            return false;
        }

        // only owner can edit singleArticle
        return article.user.id === user.id;
    }
)