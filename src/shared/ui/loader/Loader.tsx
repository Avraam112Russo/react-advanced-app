import {classNames} from "shared/lib/classNames/classNames";
import "./Loader.scss"
export interface LoaderProps {
    className?: string;
}
// loader css from loading.io
export const Loader = ({className}:LoaderProps) => {
    return (
        <div className={classNames('lds-ring')}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
        </div>
    );
};
