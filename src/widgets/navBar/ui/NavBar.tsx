import React, {useState} from 'react';
import {classNames} from "shared/lib/classNames";
import cls from "./NavBar.module.scss"
import {useTranslation} from "react-i18next";
import {Modal} from "shared/ui/modal/Modal";
import {Button, ButtonTheme} from "shared/ui/button/Button";

export interface NavBarProps {
    className?: string;
}
export const NavBar = ({className}:NavBarProps) => {
    const {t} = useTranslation();
    const [authModal, setAuthModal] = useState<boolean>(false);
    const OnToggleModal = () => {
        setAuthModal((prev) => !prev);
    }
    return (
        <div className={classNames(cls.navbar)}>

            <Button
                onClick={OnToggleModal}
                buttonTheme={ButtonTheme.OUTLINE} className={classNames(cls.links)}>
                {t('Войти')}
            </Button>
            <Modal isOpen={authModal} onClose={OnToggleModal}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolore doloribus modi natus nesciunt. Beatae illum maiores quod sit. Accusamus aliquid officiis saepe sunt! Ad aperiam aspernatur, aut est illum magni minima nesciunt nisi odio quibusdam. Accusamus alias culpa dolorem eum illo labore necessitatibus perspiciatis possimus provident, quae sunt tenetur?

            </Modal>

        </div>
    );
};