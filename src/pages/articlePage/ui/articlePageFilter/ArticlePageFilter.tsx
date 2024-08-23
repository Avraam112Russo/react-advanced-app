import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticlePageFilter.module.scss"
import {useCallback, useMemo} from "react";
import {ArticleSortField, ArticleSortOrder, ArticleType, ArticleViewType} from "entities/singleArticle/model/types/Article";
import {articlePageAction} from "pages/articlePage/model/slice/articlePageSlice";
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch} from "app/providers/storeProvider/config/store";
import {ArticleViewTypeSelector} from "entities/singleArticle";
import {
    articlePageSearchStringSelector,
    articlePageSortFieldSelector,
    articlePageSortOrderSelector, articlePageTypeArticleSelector,
    articlePageViewTypeSelector
} from "pages/articlePage/model/selectors/articlePageSelector";
import {Select} from "shared/ui/select/Select";
import {useTranslation} from "react-i18next";
import {Card} from "shared/ui/card/Card";
import {Input} from "shared/ui/input/Input";
import {ArticleSortSelect} from "entities/singleArticle/ui/articleSortSelect/ArticleSortSelect";
import {fetchArticleList} from "pages/articlePage/model/service/fetchArticleList";
import {useDebounce} from "shared/lib/hooks/useDebounce/useDebounce";
import {TabItem, Tabs} from "shared/ui/tabs/Tabs";
import {ArticleTypeTabs} from "entities/singleArticle/ui/articleTypeTabs/ArticleTypeTabs";
export interface ArticlePageFilterProps {
    className?: string;
}
export const ArticlePageFilter = ({className}:ArticlePageFilterProps) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const typeView = useSelector(articlePageViewTypeSelector)
    const searchValue = useSelector(articlePageSearchStringSelector)
    const orderSort = useSelector(articlePageSortOrderSelector)
    const fieldsSort = useSelector(articlePageSortFieldSelector)
    const typeOfArticle = useSelector(articlePageTypeArticleSelector)

    // fetch filter sort data
    const fetchFilterData = useCallback(() => {
        dispatch(fetchArticleList({replace:true})) // replace true mean that we again fetch data, don't add to the end
    }, [dispatch])
    // запрос на бекэнд идет не сразу после ввода какого то символа в строку поиска,
    // а через 500ms что бы не перегружать сервер
    // иначе при вводе 10 символов будет 10 запросов
    const debouncedFetchData = useDebounce(fetchFilterData, 500);





    // set state view type, list or tiles
    const onChangeView = useCallback((view:ArticleViewType) => {
        dispatch(articlePageAction.setView(view))
    },[dispatch])


    // set states for filters search
    const onChangeOrder = useCallback((sortOrder:ArticleSortOrder) => {
        dispatch(articlePageAction.setOrder(sortOrder))
        dispatch(articlePageAction.setPage(1))
        fetchFilterData();
    },[dispatch, fetchFilterData])
    const onChangeSort = useCallback((sortField:ArticleSortField) => {
        dispatch(articlePageAction.setSortField(sortField))
        dispatch(articlePageAction.setPage(1))
        fetchFilterData();

    },[dispatch, fetchFilterData])
    const onChangeSearch = useCallback((searchValue:string) => {
        dispatch(articlePageAction.setSearch(searchValue))
        dispatch(articlePageAction.setPage(1))
        debouncedFetchData(); // request to api with delay 500ms
    },[dispatch, debouncedFetchData])


    // type of articles // it, science, economics
    const onChangeType = useCallback((value:ArticleType) => {
        dispatch(articlePageAction.setType(value))
        dispatch(articlePageAction.setPage(1))
        fetchFilterData(); // request to api with delay 500ms
    },[dispatch, debouncedFetchData])

    return (
        <div className={classNames(cls.ArticlePageFilter)}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelect
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                    order={orderSort}
                    sort={fieldsSort}
                />
            <ArticleViewTypeSelector view={typeView} onViewClick={onChangeView}/>
            </div>
            <Card className={cls.search}>
                <Input
                    value={searchValue}
                    onChange={onChangeSearch}
                    placeholder={"Поиск..."}/>
            </Card>
            <ArticleTypeTabs className={cls.tabs} value={typeOfArticle} onChangeType={onChangeType}/>
        </div>
    );
};
