import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPage.module.scss"
import {memo, useEffect} from "react";
import {ArticleDetails} from "entities/article";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Text} from "shared/ui/text/Text";
import {CommentList} from "entities/comment";
import {DynamicModuleLoader, ReducersList} from "shared/lib/dynamicModuleLoader/DynamicModuleLoader";
import {
    ArticleDetailsCommentReducer,
    getArticleCommentSelector
} from "pages/articleDetailsPage/model/slice/ArticleDetailsCommentSlice";
import {useSelector} from "react-redux";
import {
    getArticleCommentErrorSelector,
    getArticleCommentIsLoadingSelector,
} from "pages/articleDetailsPage/model/selectors/GetArticleCommentSelector";
import {useAppDispatch} from "app/providers/storeProvider/config/store";
import {
    FetchCommentByArticleId
} from "pages/articleDetailsPage/model/services/fetchCommentByArticleId/FetchCommentByArticleId";





export interface ArticleDetailsPageProps {
    className?: string;
}
const Reducers: ReducersList = {
    article_details_comment: ArticleDetailsCommentReducer
}




 const ArticleDetailsPage = ({className}:ArticleDetailsPageProps) => {
    const {id} = useParams< {id: string} >(); // /article/:id
     const {t} = useTranslation();

     // fetch all comment
    const comments = useSelector(getArticleCommentSelector.selectAll)
    const isLoading = useSelector(getArticleCommentIsLoadingSelector)
    const error = useSelector(getArticleCommentErrorSelector)
    const dispatch = useAppDispatch();
     useEffect(() => {
         dispatch(FetchCommentByArticleId(id))
     }, []);

     if (id === undefined) {
         return (
             <div className={classNames(cls.ArticleDetailsPage)}>
             {t('Статья не найдена')}
         </div>
             )
     }

     return (
         <DynamicModuleLoader reducers={Reducers} removeAfterUnmount={true}>


         <div className={classNames(cls.ArticleDetailsPage)}>
             <ArticleDetails article_id={id}/>
             <Text className={classNames(cls.commentTitle)} title={t('Комментарии')}/>
             <CommentList
                 isLoading={isLoading}
                 listOfComments={comments}/>
        </div>


         </DynamicModuleLoader>
    );
};
export default memo(ArticleDetailsPage);