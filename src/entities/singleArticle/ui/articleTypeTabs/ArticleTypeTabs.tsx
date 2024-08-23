import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleTypeTabs.module.scss"
import {TabItem, Tabs} from "shared/ui/tabs/Tabs";
import {ArticleType} from "entities/singleArticle/model/types/Article";
import {useCallback, useMemo} from "react";
import {useTranslation} from "react-i18next";
export interface ArticleTypeTabsProps {
    className?: string,
    value?:ArticleType,
    onChangeType?:(value:ArticleType) => void,
}
export const ArticleTypeTabs = ({className, value, onChangeType}:ArticleTypeTabsProps) => {
    const {t} = useTranslation();
    const tabTypes = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content:t('Все статьи')
        },
        {
            value: ArticleType.IT,
            content:t('Айти')
        },
        {
            value: ArticleType.SCIENCE,
            content:t('Наука')
        },
        {
            value: ArticleType.ECONOMICS,
            content:t('Экономика')
        },
        {
            value: ArticleType.SPORT,
            content:t('Спорт')
        }
    ],[t])
    const onTabClick = useCallback((tab:TabItem) => {
        onChangeType?.(tab.value as ArticleType);
    }, [onChangeType])
    return (
        <Tabs
            onTabClick={onTabClick}
            value={value}
            tabs={tabTypes}
            className={classNames('', {}, [className])}/>

    );
};
