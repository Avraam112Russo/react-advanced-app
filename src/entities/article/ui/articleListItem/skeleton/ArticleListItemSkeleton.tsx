import {Article, ArticleBlockType, ArticleTextBlock, ArticleViewType} from "entities/article/model/types/Article";
import {useTranslation} from "react-i18next";
import {useHover} from "shared/lib/hooks/useHover/useHover";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {RoutePath} from "app/providers/router/routeConfig/RouteConfig";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "entities/article/ui/articleListItem/ArticleListItem.module.scss";
import {Card} from "shared/ui/card/Card";
import {Text} from "shared/ui/text/Text";
import {Icon} from "shared/ui/icon/Icon";
import viewsIcon from "shared/assets/icons/eye-20-20.svg";
import {Avatar} from "shared/ui/avatar/Avatar";
import {ArticleTextBlockComponent} from "entities/article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent";
import {Button, ButtonTheme} from "shared/ui/button/Button";
import {Skeleton} from "shared/ui/skeleton/Skeleton";

export interface ArticleListItemSkeletonProps {
    className?: string,
    view?:ArticleViewType
}
export const ArticleListItemSkeleton = (props:ArticleListItemSkeletonProps) => {
    const {className, view} = props;
    const {t} = useTranslation();
    // we can track when user hover mouse on element // useHover.ts
    const [isHover, bindHover] = useHover();


    const navigate = useNavigate();

    // open article_details by id
    // const onOpenArticle = useCallback(() => {
    //     navigate(RoutePath.article_details + article.id)
    // }, [article.id, navigate])


    console.log(isHover); // return true when user hover cursor to article element
    if (view === ArticleViewType.SMALL){
        return (
            <div {...bindHover} className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>

        <Card className={cls.card}>

        <div className={cls.imageWrapper}>
        <Skeleton width={200} height={200}  className={cls.img}/>
        </div>

        <div className={cls.infoWrapper}>
        <Skeleton width={130} height={16} className={cls.types}/>{/*join types article (science, it, etc)*/}
        </div>
        <Skeleton width={150} height={16} className={cls.title}/>
        </Card>

        </div>
    )
    }
    if (ArticleViewType.BIG){

        return(
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card className={cls.card}>
        <div className={cls.header}>
        <Skeleton border={'50%'} width={30} height={30} />
        <Skeleton width={150} height={16} className={cls.username}/>
        <Skeleton  className={cls.date}/>
        </div>
        <Skeleton width={250} height={24} className={cls.title}/>
        <img height={200} className={cls.img} />

        <div className={cls.footer}>
        <Skeleton height={36} width={200}/>

        </div>
        </Card>
        </div>
    );
    }
    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
    {/*{article.title}*/}
    </div>
);
}