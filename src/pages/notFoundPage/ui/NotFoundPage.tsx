import {classNames} from "shared/lib/classNames/classNames";
import cls from "./NotFoundPage.module.scss"
import {useTranslation} from "react-i18next";
import {PageWrapper} from "widgets/pageWrapper/PageWrapper";
export interface NotFoundPageProps {
    className?: string;
}
export const NotFoundPage = ({className}:NotFoundPageProps) => {
    const {t} = useTranslation();
    return (
        <PageWrapper className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </PageWrapper>
    );
};
