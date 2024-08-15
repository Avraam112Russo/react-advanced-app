import {classNames} from "shared/lib/classNames";
import cls from "./Modal.module.scss"
import React, {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {Portal} from "shared/ui/portal/Portal";
import {useTheme} from "app/providers/themeProvider";
export interface ModalProps {
    className?: string,
    children?: ReactNode, // content inside modal window
    isOpen?: boolean, // open modal window
    onClose?: () => void, // function for close modal window
}
export const Modal = ({className, children, isOpen, onClose}:ModalProps) => {

    const [closing, setIsClosing] = useState(false);
    const timeRef = useRef<ReturnType<typeof setTimeout>>(); // in generic, we set type which return setTimeout() function


    // useCallback store link, and we don't create new link after each call method if dependencies array didn't update
    const onCloseHandler = useCallback(() => {
        // if props OnClose come in argument<Modal/>
        if (onClose){
            setIsClosing(true);
            // timeout after click close modal window for smooth close
            timeRef.current = setTimeout(() => {
                onClose();
            setIsClosing(false);
            }, 300)
        }
    },[onClose]);

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === "Space") {
            onCloseHandler();
        }
    },[onCloseHandler])
    useEffect(() => {
        if (isOpen === true){
            // if modal window is open, we add event listener
            window.addEventListener("keydown", onKeyDown)
        }
        return () => {
            clearTimeout(timeRef.current); // clear timeout after close modal window
            window.removeEventListener("keydown", onKeyDown) // clear after close modal usage keyboard
        }
    }, [isOpen, onKeyDown]);

    const MODS_CLASSNAMES:Record<string, boolean> = {
        [cls.opened]: isOpen,// if props isOpen true we add classname "opened"
        [cls.isClosing]: closing,
    }

    const stopClickOnModal = (event: React.MouseEvent) => {

        // forbidden click on modal window
        // we can click only on overlay
        event.stopPropagation();
    }

    return (
        <Portal>
        <div className={classNames(cls.Modal, MODS_CLASSNAMES, [className])}>
           <div
               onClick={onCloseHandler} // click on modal window and it closed
               className={classNames(cls.overlay)}>
               <div

                   onClick={stopClickOnModal} // forbidden click on ModalWindowContent
                   className={classNames(cls.content, {[cls.contentOpened]:isOpen}, [className])}>
                   {children}
               </div>
           </div>
        </div>
        </Portal>
    );
};
