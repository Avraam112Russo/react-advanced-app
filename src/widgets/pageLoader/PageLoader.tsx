import {classNames} from "shared/lib/classNames/classNames";
import "./PageLoader.scss"
import {Loader} from "shared/ui/loader/Loader";
export interface PageLoaderProps {
    className?: string;
}
export const PageLoader = ({className}:PageLoaderProps) => {

    // see loading.io
    return (

        <div className={classNames('page__loader')}>
           <Loader/>
        </div>
    );
};
