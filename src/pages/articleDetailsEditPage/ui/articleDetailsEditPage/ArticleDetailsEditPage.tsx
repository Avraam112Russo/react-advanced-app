import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailsEditPage.module.scss"
import {useParams} from "react-router-dom";
import {PageWrapper} from "widgets/pageWrapper/PageWrapper";
import {useTranslation} from "react-i18next";
export interface ArticleEditPageProps {
    className?: string;
}
const ArticleDetailsEditPage = ({className}:ArticleEditPageProps) => {
    const {id} = useParams<{id:string}>()// get id from request params
    const isEditOrCreateOperation = Boolean(id) // have request param (id) or not
    const {t} = useTranslation();
    return (
        <PageWrapper className={classNames(cls.ArticleEditPage)}>
            {
                isEditOrCreateOperation ?
                    t('Редактирование статьи с ID = ') + id
                    :
                    t('Создание новой статьи')



            }
        </PageWrapper>
    );
};
// lazy components work only with default import
export default ArticleDetailsEditPage;