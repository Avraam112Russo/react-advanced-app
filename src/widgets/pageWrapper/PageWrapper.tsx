import {classNames} from "shared/lib/classNames/classNames";
import cls from "./PageWrapper.module.scss"
import {MutableRefObject, UIEvent, useEffect, useRef} from "react";
import {useInfiniteScroll} from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import {useAppDispatch} from "app/providers/storeProvider/config/store";
import {getSaveScrollByPathSelector, scrollSaveActions} from "features/scrollSave";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {StateSchema} from "app/providers/storeProvider";
import path from "node:path";
import {useThrottle} from "shared/lib/hooks/useThrottle/useThrottle";
export interface PageWrapperProps {
    className?: string,
    children?: React.ReactNode,
    onScrollEnd?: () => void; // callback for IntersectionObserver
}
export const PageWrapper = ({className, children, onScrollEnd}:PageWrapperProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const dispatch = useAppDispatch();

    // get currently page location
    const location = useLocation();
    const {pathname} = location;


    // retrieve scroll position by page name
    const scrollPosition =
        useSelector((state: StateSchema) => getSaveScrollByPathSelector(state, pathname))

    // function which will work when user scroll to trigger div element
    useInfiniteScroll({
        triggerRef:triggerRef,
        wrapperRef:wrapperRef,
        callBack: onScrollEnd
    })

    // useDebounce -> call function after some delay
    const onScroll = useThrottle((event:UIEvent<HTMLDivElement>) => {
        console.log("SCROLL");
        dispatch(scrollSaveActions.setScrollPosition({
            position: event.currentTarget.scrollTop, // set currently scroll position to state
            path: pathname
        }))
    }, 500)
    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    }, );
    return (
        <div
            onScroll={onScroll} // listen scroll event
            ref={wrapperRef}// component where will contains scroll
            className={classNames(cls.PageWrapper)}
        >
            {children}


            {onScrollEnd ?

                <div className={cls.triggerDiv} ref={triggerRef}/>
            :
                null
            }
                {/*block inside the page which will hidden from the user*/}


        </div>
    );
};
