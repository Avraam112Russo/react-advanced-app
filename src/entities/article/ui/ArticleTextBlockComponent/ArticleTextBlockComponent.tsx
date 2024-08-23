import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleTextBlockComponent.module.scss"
import {memo} from "react";
import {ArticleTextBlock} from "entities/article/model/types/Article";
import {Text} from "shared/ui/text/Text";
export interface ArticleTextBlockComponentProps {
    className?: string,
    block: ArticleTextBlock
}
export const ArticleTextBlockComponent =
    memo(({className, block}:ArticleTextBlockComponentProps) => {
    return (
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
            {block?.title && (
                <Text
                    className={classNames(cls.title)}
                    title={block?.title}/>
            )}
            {block?.paragraphs?.map((paragraph, index) => (
                <Text key={paragraph} text={paragraph} className={classNames(cls.paragraph)} />
            ))}
        </div>
    );
});
