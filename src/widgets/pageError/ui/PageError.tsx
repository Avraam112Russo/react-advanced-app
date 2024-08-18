import {classNames} from "shared/lib/classNames/classNames";
import cls from "./PageError.module.scss"
import {useTranslation} from "react-i18next";
import {Button} from "shared/ui/button/Button";
export interface PageErrorProps {
    className?: string;
}
export const PageError = ({className}:PageErrorProps) => {
    const {t} = useTranslation();


    // RELOAD PAGE AFTER ERROR
    const reloadPage = () => {
        window.location.reload();
    }
    return (
        <div className={classNames(cls.PageError)}>
            <p>{t('Произошла непредвиденная ошибка')}</p>
            <Button
                className={cls.btn}
                onClick={reloadPage}>
                {t('Обновить страницу')}
            </Button>
        </div>
    );
};
