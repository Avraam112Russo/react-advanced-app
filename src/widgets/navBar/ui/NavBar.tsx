import React, {useState} from 'react';
import {classNames} from "shared/lib/classNames";
import cls from "./NavBar.module.scss"
import {useTranslation} from "react-i18next";
import {Modal} from "shared/ui/modal/Modal";
import {Button, ButtonTheme} from "shared/ui/button/Button";
import {LoginModal} from "features/authByUsername/ui/LoginModalWindow/LoginModal";

export interface NavBarProps {
    className?: string;
}
export const NavBar = ({className}:NavBarProps) => {
    const {t} = useTranslation();
    const [isOpenAuthModal, setIsOpenAuthModal] = useState<boolean>(false);

    const onCloseModal = () => {
        setIsOpenAuthModal(false);
    }
    const onShowModal = () => {
        setIsOpenAuthModal(true);
    }
    return (
        <div className={classNames(cls.navbar)}>

            <Button
                onClick={onShowModal}
                buttonTheme={ButtonTheme.OUTLINE} className={classNames(cls.links)}>
                {t('Войти')}
            </Button>
            <LoginModal
                isOpen={isOpenAuthModal}
            onClose={onCloseModal}
            />

        </div>
    );
};