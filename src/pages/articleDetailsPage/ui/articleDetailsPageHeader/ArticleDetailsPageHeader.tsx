import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPageHeader.module.scss"
import {useCallback} from "react";
import {RoutePath} from "app/providers/router/routeConfig/RouteConfig";
import {Button, ButtonTheme} from "shared/ui/button/Button";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {StateSchema} from "app/providers/storeProvider";
import {getUserAuthDataSelector} from "entities/user/model/selector/getUserAuthDataSelector";
import {getArticleDetailsData} from "entities/singleArticle/model/selectors/ArticleDetailsSelector";
import {getUserCanEditArticleSelector} from "pages/articleDetailsPage/model/selectors/getUserCanEditArticleSelector";
export interface ArticleDetailsPageHeaderProps {
    className?: string;
}


export const ArticleDetailsPageHeader = ({className}:ArticleDetailsPageHeaderProps) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const currentlyArticle = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
            navigate(RoutePath.article) // back to list with all articles
        }, [navigate])

    // only owner can edit article
    const canEditArticle = useSelector(getUserCanEditArticleSelector);

    const onEditArticle = useCallback(() => {
        navigate("/article_details/edit/" + currentlyArticle?.id)
    }, [navigate, currentlyArticle?.id])



    return (
        <div className={classNames(cls.ArticleDetailsPageHeader)}>
        <Button onClick={onBackToList} buttonTheme={ButtonTheme.OUTLINE}>
            {t('Назад к списку')}
        </Button>

            {canEditArticle && (
                <Button
                className={cls.editBtn}
                onClick={onEditArticle}
                buttonTheme={ButtonTheme.OUTLINE}
            >
                {t('Редактировать')}
            </Button>
            )}

        </div>
    );
};
