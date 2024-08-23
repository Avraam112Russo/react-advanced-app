import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleCodeBlockComponent.module.scss"
import {memo} from "react";
import {ArticleCodeBlock} from "entities/singleArticle/model/types/Article";
import {Code} from "shared/ui/code/Code";
export interface ArticleImageBlockComponentProps {
    className?: string,
    block: ArticleCodeBlock
}
export const ArticleCodeBlockComponent =
    memo(({className, block}:ArticleImageBlockComponentProps) => {
    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <Code text={block.code}/>
        </div>
    );
});
