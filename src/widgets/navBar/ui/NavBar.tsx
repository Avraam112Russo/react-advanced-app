import React, {useCallback, useState} from 'react';
import {classNames} from "shared/lib/classNames";
import cls from "./NavBar.module.scss"
import {useTranslation} from "react-i18next";
import {Modal} from "shared/ui/modal/Modal";
import {Button, ButtonTheme} from "shared/ui/button/Button";
import {LoginModal} from "features/authByUsername/ui/LoginModalWindow/LoginModal";
import {useDispatch, useSelector} from "react-redux";
import {StateSchema} from "app/providers/storeProvider/config/StateSchema";
import {userActions} from "entities/user";

export interface NavBarProps {
    className?: string;
}
export const NavBar = ({className}:NavBarProps) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    // is open or is close modal window
    const [isOpenAuthModal, setIsOpenAuthModal] = useState<boolean>(false);


    // close modal window
    const onCloseModal = useCallback(() => {
        setIsOpenAuthModal(false);
    }, [])

    // open modal window
    const onShowModal = useCallback(() => {
        setIsOpenAuthModal(true);
    },[])

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    },[dispatch])

    const userAuthDataFromState = useSelector((state: StateSchema) => state.user.userAuthData);
    if (userAuthDataFromState != null) {
        return (<div className={classNames(cls.navbar)}>

            <Button
                onClick={onShowModal}
                buttonTheme={ButtonTheme.OUTLINE} className={classNames(cls.links)}>
                {t('Выйти')}
            </Button>

        </div>)
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