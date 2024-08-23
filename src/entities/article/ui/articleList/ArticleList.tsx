import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss"
import {Article, ArticleViewType} from "entities/article/model/types/Article";
import {ArticleListItem} from "entities/article/ui/articleListItem/ArticleListItem";
import {ArticleListItemSkeleton} from "entities/article/ui/articleListItem/skeleton/ArticleListItemSkeleton";
import {Text, TextSize} from "shared/ui/text/Text";

export interface ArticleListProps {
    className?: string,
    articles:Article[],
    isLoading?: boolean,
    view?: ArticleViewType, // type how we see list of article (list, square)
}
export const ArticleList = (props:ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleViewType.SMALL,
        isLoading
    } = props;

    if (isLoading === true){
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                {
                    new Array(view === ArticleViewType.SMALL ? 9 : 3)
                        .fill(0)
                        .map((item, index) => (
                            <ArticleListItemSkeleton className={cls.card} key={index} view={view}/>
                        ))
                }
            </div>
        )
    }
    if (!isLoading && !articles.length) { // if articles with specify type not found
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
               <Text size={TextSize.L} text={"Статьи не найдены"} />
            </div>
        );
    }


    const renderArticles = (article: Article) => {
        return (
            <ArticleListItem
                key={article.id}
                className={cls.card}
                article={article} view={view}/>
        )
    }
    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles.length > 0 ?

                articles.map(renderArticles)

                :

                null}
        </div>
    );
};
