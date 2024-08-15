import {classNames} from "shared/lib/classNames";
import cls from "./LoginModal.module.scss"
import {Modal} from "shared/ui/modal/Modal";
import {LoginForm} from "../LoginForm/LoginForm";
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
            <LoginForm/>
        </Modal>
    );
};
