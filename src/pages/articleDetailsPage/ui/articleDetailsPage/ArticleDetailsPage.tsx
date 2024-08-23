import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPage.module.scss"
import {memo, useCallback, useEffect} from "react";
import {ArticleDetails} from "entities/singleArticle";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Text, TextSize} from "shared/ui/text/Text";
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
import {
    ArticleDetailsPage_Recommendation_Reducer,
    getArticle_Recommendation_Selector
} from "pages/articleDetailsPage/model/slice/ArticleDetailsPageRecommendationSlice";
import {
    articleDetailsPage_Recommendation_Error_Selector,
    articleDetailsPage_Recommendation_IsLoading_Selector
} from "pages/articleDetailsPage/model/selectors/GetArticleDetailsPageRecommendationSelector";
import {ArticleList} from "entities/singleArticle/ui/articleList/ArticleList";
import {
    fetchRecommendationArticleList
} from "pages/articleDetailsPage/model/services/fetchRecommendationListArticles/fetchRecommendationListArticles";
import {ArticleDetailsPageHeader} from "pages/articleDetailsPage/ui/articleDetailsPageHeader/ArticleDetailsPageHeader";


export interface ArticleDetailsPageProps {
    className?: string;
}
const Reducers: ReducersList = {
    article_details_comment: ArticleDetailsCommentReducer,
    recommendation: ArticleDetailsPage_Recommendation_Reducer
}




 const ArticleDetailsPage = ({className}:ArticleDetailsPageProps) => {
    const {id} = useParams< {id: string} >(); // /singleArticle/:id
     const {t} = useTranslation();

     // use CommentAdapter selector for normalizing data
    const comments = useSelector(getArticleCommentSelector.selectAll)
     // use simple selector
    const isLoading = useSelector(getArticleCommentIsLoadingSelector)
    const error = useSelector(getArticleCommentErrorSelector)




     // use RecommendationAdapter selector for normalizing data
    const recommendations = useSelector(getArticle_Recommendation_Selector.selectAll)
     // use simple selector
     const isLoadingRecommendations = useSelector(articleDetailsPage_Recommendation_IsLoading_Selector)
     const errorRecommendations = useSelector(articleDetailsPage_Recommendation_Error_Selector)





    const dispatch = useAppDispatch();

    // send comment to api usage async thunk
    const onSendCommentToApi = useCallback((text:string) => {
        dispatch(AddCommentForArticle(text))
    }, [dispatch])



     useEffect(() => {
         dispatch(FetchCommentByArticleId(id))
         dispatch(fetchRecommendationArticleList())
     }, [dispatch]);

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
            <ArticleDetailsPageHeader/>
             <ArticleDetails article_id={id}/>



             <Text
                 size={TextSize.L}
                 className={classNames(cls.commentTitle)} title={t('Рекомендуем')}/>
            <ArticleList
                target={"_blank"} // open link in new window
                className={cls.recommendations}
                articles={recommendations} isLoading={isLoadingRecommendations}/>


             <Text className={classNames(cls.commentTitle)} title={t('Комментарии')}/>
             <AddNewCommentForm onSendCommentToApi={onSendCommentToApi}/>
             <CommentList
                 isLoading={isLoading}
                 listOfComments={comments}/>


        </PageWrapper>


         </DynamicModuleLoader>
    );
};
// lazy components work only with default import
export default memo(ArticleDetailsPage);