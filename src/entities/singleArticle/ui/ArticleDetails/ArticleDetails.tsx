import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleDetails.module.scss"
import {DynamicModuleLoader, ReducersList} from "shared/lib/dynamicModuleLoader/DynamicModuleLoader";
import {ArticleDetailsReducer} from "entities/singleArticle/model/slice/ArticleSlice";
import {memo, useCallback, useEffect} from "react";
import {useAppDispatch} from "app/providers/storeProvider/config/store";
import {FetchArticleById} from "entities/singleArticle/model/services/fetchArticleById/FetchArticleById";
import {useSelector} from "react-redux";
import ViewIcon from "shared/assets/icons/Vector-4.svg"
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from "entities/singleArticle/model/selectors/ArticleDetailsSelector";
import {Text, TextAlign, TextSize} from "shared/ui/text/Text";
import {useTranslation} from "react-i18next";
import {Skeleton} from "shared/ui/skeleton/Skeleton";
import {Avatar} from "shared/ui/avatar/Avatar";
import {Icon} from "shared/ui/icon/Icon";
import {ArticleBlock, ArticleBlockType} from "entities/singleArticle/model/types/Article";
import {ArticleCodeBlockComponent} from "entities/singleArticle/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import {ArticleImageBlockComponent} from "entities/singleArticle/ui/ArticleImageBlockComponent/ArticleImageBlockComponent";
import {ArticleTextBlockComponent} from "entities/singleArticle/ui/ArticleTextBlockComponent/ArticleTextBlockComponent";


export interface ArticleDetailsProps {
    className?: string,
    article_id?: string
}
const reducers: ReducersList = {
    article_details: ArticleDetailsReducer
}
export const ArticleDetails = memo((props:ArticleDetailsProps) => {
    const {className, article_id} = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);
    const {t} = useTranslation();
    useEffect(() => {
        dispatch(FetchArticleById(article_id))
    }, [dispatch, article_id]);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type){
            case ArticleBlockType.CODE:
                return <ArticleCodeBlockComponent  className={cls.block} block={block}/>
            case ArticleBlockType.TEXT:
                return <ArticleTextBlockComponent className={cls.block} block={block}/>
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockComponent className={cls.block} block={block}/>
            default:
                return null;
        }
    }, [])



    let content;
    if (isLoading === true){
        content = (
            <div>

            <Skeleton className={cls.avatar} height={200} width={200} border={'50%'}/>
            <Skeleton className={cls.title} height={32} width={300} />
            <Skeleton className={cls.simple} height={24} width={600}/>
            <Skeleton className={cls.simple} height={200} width={'100%'}/>
            <Skeleton className={cls.simple} height={200} width={'100%'}/>
            </div>
        )
    }


    else if (error){
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t('Ошибка при попытке запроса статьи')}
                text={''}/>

            )
    }


    else {
        content = (
            <>
                <div className={cls.avatarWrapper}>

                {/*img singleArticle*/}
                <Avatar size={200} src={article?.img} className={cls.avatar}/>

                </div>
                <Text
                    className={cls.title}
                    size={TextSize.L}
                    title={article?.title} text={article?.subtitle}/>
                <div className={cls.articleInfo}>
                    <Icon className={classNames(cls.icon)} Svg={ViewIcon}/>
                    <Text text={String(article?.views)}/>
                </div>
                <div className={cls.articleInfo}>
                    <Icon className={classNames(cls.icon)} Svg={ViewIcon}/>
                    <Text text={article?.createdAt}/>
                </div>

                {/* render text, code, image block */}
                {article?.blocks?.map(renderBlock)}
            </>
        )

    }
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
        <div className={classNames(cls.ArticleDetails)}>
            {content}
        </div>
            </DynamicModuleLoader>
    );
});
