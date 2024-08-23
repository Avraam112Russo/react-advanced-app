import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleListItem.module.scss"
import {Article, ArticleBlockType, ArticleTextBlock, ArticleViewType} from "entities/article/model/types/Article";
import {Text} from "shared/ui/text/Text";
import {Icon} from "shared/ui/icon/Icon";
import viewsIcon from "shared/assets/icons/eye-20-20.svg"
import {Card} from "shared/ui/card/Card";
import {useHover} from "shared/lib/hooks/useHover/useHover";
import {Avatar} from "shared/ui/avatar/Avatar";
import {Button, ButtonTheme} from "shared/ui/button/Button";
import {useTranslation} from "react-i18next";
import {ArticleTextBlockComponent} from "entities/article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "app/providers/router/routeConfig/RouteConfig";

export interface ArticleListItemProps {
    className?: string,
    article: Article,
    view?:ArticleViewType
}
export const ArticleListItem = (props:ArticleListItemProps) => {
    const {className, article, view} = props;
    const {t} = useTranslation();
    // we can track when user hover mouse on element // useHover.ts
    const [isHover, bindHover] = useHover();


    const navigate = useNavigate();

    // open article_details by id page
    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id)
    }, [article.id, navigate])


    console.log(isHover); // return true when user hover cursor to article element
    if (view === ArticleViewType.SMALL){
        return (
            <div {...bindHover} className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>

                <Card onClick={onOpenArticle} className={cls.card}>

                <div className={cls.imageWrapper}>
                <img alt={article.title} src={article.img} className={cls.img}/>
                <Text text={article.createdAt} className={cls.date}/>
                </div>

                <div className={cls.infoWrapper}>
                    <Text text={article.type.join(", ")} className={cls.types}/>{/*join types article (science, it, etc)*/}
                    <Text text={String(article.views)} className={cls.views}/>
                    <Icon Svg={viewsIcon}/>
                </div>
                <Text text={article.title} className={cls.title}/>
                </Card>

            </div>
        )
    }
    if (ArticleViewType.BIG){
        let textBlock =
            article.blocks.find(block => block.type === ArticleBlockType.TEXT) as ArticleTextBlock
        return(
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30}/>
                        <Text text={article?.user?.username} className={cls.username}/>
                        <Text text={article?.createdAt} className={cls.date}/>
                    </div>
                    <Text title={article?.title} className={cls.title}/>
                    <Text text={article?.type.join(", ")} className={cls.types}/>{/*join types article (science, it, etc)*/}
                    <img src={article?.img} className={cls.img} alt={article?.title}/>
                    {textBlock &&(
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock}/>
                    )}
                    <div className={cls.footer}>
                        <Button onClick={onOpenArticle} buttonTheme={ButtonTheme.OUTLINE}>{t('Читать далее')}</Button>
                        <Text text={String(article?.views)} className={cls.views}/>
                        <Icon Svg={viewsIcon}/>
                    </div>
                </Card>
            </div>
        );
    }
    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            {article.title}
        </div>
    );
};
