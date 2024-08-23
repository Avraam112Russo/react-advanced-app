import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPage.module.scss"
import {memo, useCallback, useEffect} from "react";
import {ArticleDetails} from "entities/article";
import {useNavigate, useParams} from "react-router-dom";
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
import {AddNewCommentForm} from "features/addNewComment";
import {AddCommentForArticle} from "pages/articleDetailsPage/model/services/addCommentForArticle/AddCommentForArticle";
import {Button, ButtonTheme} from "shared/ui/button/Button";
import {RoutePath} from "app/providers/router/routeConfig/RouteConfig";
import {PageWrapper} from "widgets/pageWrapper/PageWrapper";


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

    // send comment to api usage async thunk
    const onSendCommentToApi = useCallback((text:string) => {
        dispatch(AddCommentForArticle(text))
    }, [dispatch])



     useEffect(() => {
         dispatch(FetchCommentByArticleId(id))
     }, []);

     if (id === undefined) {
         return (
             <PageWrapper className={classNames(cls.ArticleDetailsPage)}>
             {t('Статья не найдена')}
         </PageWrapper>
             )
     }

     const navigate = useNavigate();
     const onBackToList = useCallback(() => {
         navigate(RoutePath.article) // back to list with all articles
     }, [navigate])
     return (
         <DynamicModuleLoader reducers={Reducers} removeAfterUnmount={true}>


         <PageWrapper className={classNames(cls.ArticleDetailsPage)}>
             <Button onClick={onBackToList} buttonTheme={ButtonTheme.OUTLINE}>{t('Назад к списку')}</Button>
             <ArticleDetails article_id={id}/>
             <Text className={classNames(cls.commentTitle)} title={t('Комментарии')}/>
             <AddNewCommentForm onSendCommentToApi={onSendCommentToApi}/>
             <CommentList
                 isLoading={isLoading}
                 listOfComments={comments}/>
        </PageWrapper>


         </DynamicModuleLoader>
    );
};
export default memo(ArticleDetailsPage);