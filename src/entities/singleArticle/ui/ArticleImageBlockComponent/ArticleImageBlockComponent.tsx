import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleImageBlockComponent.module.scss"
import {memo} from "react";
import {ArticleImageBlock} from "entities/singleArticle/model/types/Article";
import {Text, TextAlign} from "shared/ui/text/Text";

export interface ArticleImageBlockComponentProps {
    className?: string,
    block: ArticleImageBlock
}
export const ArticleImageBlockComponent =
    memo(({className, block}:ArticleImageBlockComponentProps) => {
    return (
        <div className={classNames(cls.ArticleImageBlockComponent)}>
            <img src={block.src} className={classNames(cls.img, {}, [className])} alt={block.title}/>
            {block.title && <Text text={block.title} align={TextAlign.LEFT}/>}
        </div>
    );
}, );
