
// async request to api
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Profile} from "entities/profile";
import {ThunkConfig} from "app/providers/storeProvider/config/StateSchema";
import i18n from "shared/config/i18n/i18n";
import {Article} from "entities/article/model/types/Article";



// async request to backend
export const FetchArticleById =

    // 1 arg -> return type, 2 arg -> type of arg, 3 arg -> type of error, extra
    createAsyncThunk<Article, string, ThunkConfig<string>>(
        'article/fetchArticleByID',



        // _ mean that we don't have argument
        //@ts-ignore
        async (articleId, thunkAPI) => {
            // const {t} = useTranslation();
            const {
                extra,
                rejectWithValue
            } = thunkAPI;

            try {

                // get article by id
                const response = await extra.api.get<Article>("/articles/" + articleId)

                const data = response.data;
                if (!response.data) {
                    throw new Error();
                }
                console.log(data)
                return data
            }catch (error){
                console.log("Ошибка при попытке запроса статьи: " + error);
                return rejectWithValue(i18n.t('Ошибка при попытке запроса статьи'));
            }
        },
    )