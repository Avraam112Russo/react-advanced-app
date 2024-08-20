import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Skeleton.module.scss"
import {CSSProperties} from "react";
export interface SkeletonProps {
    className?: string,
    height?:string | number,
    width?:string | number,
    border?:string,
}
export const Skeleton = ({className, height, width, border}:SkeletonProps) => {
    const styles: CSSProperties = {
        height, width, borderRadius: border
    }
    return (

        // loader component
        <div
            style={styles}
            className={classNames(cls.Skeleton, {}, [className])}/>

    );
};
