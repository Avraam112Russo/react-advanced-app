import {classNames} from "shared/lib/classNames/classNames";
import cls from "./LoginModal.module.scss"
import {Modal} from "shared/ui/modal/Modal";
import {Suspense} from "react";
import {Loader} from "shared/ui/loader/Loader";
import {LoginFormLazy} from "features/authByUsername/ui/LoginForm/LoginForm.lazy";
export interface LoginModalProps {
    className?: string,
    isOpen?: boolean, // open or close modal window
    onClose?: () => void; // function for close modal window
}
export const LoginModal = ({className, isOpen, onClose}:LoginModalProps) => {

    return (
        <Modal
            // lazy loading == true
            lazy
            isOpen={isOpen}
            onClose={onClose}
            className={classNames(cls.LoginModal, {}, [className])}>

            {/*lazy loading modal window with login form*/}
            <Suspense fallback={<Loader/>}>

             {/*close modal window with login form after success login   */}
            <LoginFormLazy onSuccess={onClose}/>
            </Suspense>


        </Modal>
    );
};
