import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleSortSelect.module.scss"
import {Select, Select_Type_Option} from "shared/ui/select/Select";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {ArticleSortField, ArticleSortOrder} from "entities/article/model/types/Article";
export interface ArticleSortSelectProps {
    className?: string,
    order: ArticleSortOrder,
    sort: ArticleSortField,
    onChangeOrder: (order: ArticleSortOrder) => void,
    onChangeSort: (sortField: ArticleSortField) => void,

}

export const ArticleSortSelect = (props:ArticleSortSelectProps) => {
    const {className,onChangeSort, sort, onChangeOrder, order} = props;
    const {t} = useTranslation();
    const sortOrderOptions = useMemo<Select_Type_Option[]>(() => [
        {
            value:"asc",
            content: t("возрастанию")
        },
        {
            value:"desc",
            content: t('убыванию')
        }
], [])
    const sortFieldsOptions = useMemo<Select_Type_Option[]>(() => [
        {
            value: ArticleSortField.TITLE,
            content: t("названию")
        },
        {
            value: ArticleSortField.CREATED_AT,
            content: t("дате создания")
        },
        {
            value: ArticleSortField.VIEW,
            content: t("количеству просмотров")
        },
    ], [])
    return (
        <div className={classNames(cls.ArticleSortSelect)}>
            <Select
                onChange={onChangeSort}
                value={sort}
                option={sortFieldsOptions} label={'Сортировать ПО: '}
            />
            <Select
                className={cls.order}
                onChange={onChangeOrder}
                value={order}
                option={sortOrderOptions} label={'по: '}
            />

        </div>
    );
};
