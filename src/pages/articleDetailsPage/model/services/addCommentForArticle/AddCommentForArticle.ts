import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "entities/user";
import {ThunkConfig} from "app/providers/storeProvider/config/StateSchema";
import {LOCAL_STORAGE_USER_KEY} from "shared/global_const/local_storage";
import i18n from "shared/config/i18n/i18n";
import {Comment} from "entities/comment";
import {useSelector} from "react-redux";
import {getUserAuthDataSelector} from "entities/user/model/selector/getUserAuthDataSelector";
import {getArticleDetailsData} from "entities/singleArticle/model/selectors/ArticleDetailsSelector";
import {AddNewCommentAction} from "features/addNewComment/model/slice/AddNewCommentSlice";
import {
    FetchCommentByArticleId
} from "pages/articleDetailsPage/model/services/fetchCommentByArticleId/FetchCommentByArticleId";

export interface SendCommentToApiProps {

}


// async request to api
export const AddCommentForArticle =

    // User - return value from backend, RequestLoginToApiProps - value for request, {rejectValue: string} - override type for error
    // see createAsyncThunk -> AsyncThunkConfig
    createAsyncThunk<Comment, string, ThunkConfig<string>>(
        'articleDetails/sendComment',
        async (commentText,  thunkAPI) => {
            // const {t} = useTranslation();
            const {
                extra,
                dispatch,
                rejectWithValue,
                getState
            } = thunkAPI;


            const user = getUserAuthDataSelector(getState()) // get user auth data from state
            const article = getArticleDetailsData(getState()) // get singleArticle from state

            if (!user || !commentText || !article) {
                return rejectWithValue('Error while send comment to api');
            }
            try {
                const response = await extra.api.post<Comment>("/comments", {
                    articleId: article.id,
                    userId:user.id,
                    text:commentText
                })

                if (!response.data){
                    throw new Error("Empty data return from backend")
                }
                dispatch(FetchCommentByArticleId(article.id)) // get refresh comments after sent request
                return response.data
            }catch (error){
                console.log("Something went wrong: " + error);
                return rejectWithValue(i18n.t('Ошибка при создании комментария'));
            }
        },
    )