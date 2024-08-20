import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticlePage.module.scss"
import {memo} from "react";
export interface ArticlePageProps {
    className?: string;
}
const ArticlePage = ({className}:ArticlePageProps) => {
    return (
        <div className={classNames(cls.ArticlePage)}>
            ArticlePage
        </div>
    );
};
export default memo(ArticlePage);
