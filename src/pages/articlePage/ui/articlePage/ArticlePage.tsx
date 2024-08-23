import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticlePage.module.scss"
import {memo, useCallback, useEffect} from "react";
import {ArticleList} from "entities/article/ui/articleList/ArticleList";
import {DynamicModuleLoader, ReducersList} from "shared/lib/dynamicModuleLoader/DynamicModuleLoader";
import {
    articlePageAction,
    articlePageReducer,
    getArticleSelector
} from "pages/articlePage/model/slice/articlePageSlice";
import { useSearchParams } from "react-router-dom";
import {useAppDispatch} from "app/providers/storeProvider/config/store";
import {fetchArticleList} from "pages/articlePage/model/service/fetchArticleList";
import {useSelector} from "react-redux";
import {
    articlePageErrorSelector, articlePageHasMoreSelector, articlePageInitStateSelector,
    articlePageIsLoadingSelector, articlePageNumberPageSelector,
    articlePageViewTypeSelector
} from "pages/articlePage/model/selectors/articlePageSelector";
import {ArticleViewTypeSelector} from "entities/article";
import {PageWrapper} from "widgets/pageWrapper/PageWrapper";
import {fetchNextArticlesPage} from "pages/articlePage/model/service/fetchNextArticlesPage";
import {ArticlePageFilter} from "pages/articlePage/ui/articlePageFilter/ArticlePageFilter";
import {ArticleSortField, ArticleSortOrder} from "entities/article/model/types/Article";

export interface ArticlePageProps {
    className?: string;
}
const reducers: ReducersList = {
    articlesPage: articlePageReducer
}
const ArticlePage = ({className}:ArticlePageProps) => {
    const dispatch = useAppDispatch();

    // get values from state
    const articles = useSelector(getArticleSelector.selectAll)
    const isLoading = useSelector(articlePageIsLoadingSelector)
    const error = useSelector(articlePageErrorSelector)
    const typeView = useSelector(articlePageViewTypeSelector)
    const currentlyPage = useSelector(articlePageNumberPageSelector)
    const hasMore = useSelector(articlePageHasMoreSelector)
    const _inited = useSelector(articlePageInitStateSelector)

    let [searchParams, setSearchParams] = useSearchParams(); // return URLSearchParams object




    useEffect(() => {

        // initialized state only one time
        if (!_inited){
            // const orderParamFromUrl = searchParams.get("order") as ArticleSortOrder;
            // const sortParamFromUrl = searchParams.get("sort") as ArticleSortField;
            // const searchParamFromUrl = searchParams.get("search");
            //
            //
            // // update state and save query params from url
            // // we can send full link with all query params to friend
            // // when he opens link, all filters and sort will accept
            // if (orderParamFromUrl){
            //     dispatch(articlePageAction.setOrder(orderParamFromUrl))
            // }
            // if (sortParamFromUrl){
            //     dispatch(articlePageAction.setSortField(sortParamFromUrl));
            // }
            // if (searchParamFromUrl){
            //     dispatch(articlePageAction.setSearch(searchParams));
            // }

            dispatch(articlePageAction.initStateArticleView());
            dispatch(fetchArticleList({}));
        }

    }, [dispatch]);






    const onLoadNextPartArticles = useCallback(() => { // loading next part articles when scroll come to target
       dispatch(fetchNextArticlesPage())
        console.log("onLoadNextPartArticles function work")
    }, [dispatch, currentlyPage])


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>

        <PageWrapper onScrollEnd={onLoadNextPartArticles}  className={classNames(cls.ArticlePage)}>
            <ArticlePageFilter/>
            <ArticleList
                className={cls.articleList}
                isLoading={isLoading}
                view={typeView}
                articles={articles}
            />
        </PageWrapper>
            
        </DynamicModuleLoader>
    );
};
export default memo(ArticlePage);
