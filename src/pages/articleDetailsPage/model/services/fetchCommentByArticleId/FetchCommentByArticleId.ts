// async request to api
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Comment} from "entities/comment";
import {ThunkConfig} from "app/providers/storeProvider/config/StateSchema";
import i18n from "shared/config/i18n/i18n";

export const FetchCommentByArticleId =

    // 1 arg -> return type, 2 arg -> type of arg, 3 arg -> type of error, extra
    createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
        'articleDetails/fetchCommentByArticleId',



        // _ mean that we don't have argument
        //@ts-ignore
        async (articleId, thunkAPI) => {
            // const {t} = useTranslation();
            const {
                extra,
                rejectWithValue
            } = thunkAPI;

            if (!articleId) {
                return rejectWithValue('Article id undefined')
            }
            try {

                // get article by id
                const response = await extra.api.get<Comment[]>("/comments/", {
                    params:{
                        articleId,
                        _expand:'user' // fetch User entity for download avatar user, etc..

                    }
                })

                const data = response.data;
                if (!response.data) {
                    throw new Error();
                }
                console.log(data)
                return data
            } catch (error) {
                console.log("Ошибка при попытке запроса статьи: " + error);
                return rejectWithValue(i18n .t('Ошибка при попытке запроса статьи'));
            }
        }
    )