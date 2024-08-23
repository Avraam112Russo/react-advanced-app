import {classNames} from "shared/lib/classNames/classNames";
import {ArticleViewType} from "entities/article/model/types/Article";
import cls from "./ArticleViewTypeSelector.module.scss"
import ListIcon from "shared/assets/icons/list-24-24.svg"
import TiledIcon from "shared/assets/icons/tiled-24-24.svg"
import {Button, ButtonTheme} from "shared/ui/button/Button";
import {Icon} from "shared/ui/icon/Icon";

export interface ArticleViewTypeSelectorProps {
    className?: string,
    view:ArticleViewType,
    onViewClick?:(view:ArticleViewType) => void;
}
const viewType = [
    {
        view: ArticleViewType.SMALL,
        icon: TiledIcon
    },
    {
        view: ArticleViewType.BIG,
        icon: ListIcon
    }
]
export const ArticleViewTypeSelector = ({className, onViewClick, view}:ArticleViewTypeSelectorProps) => {
    const click = (newView:ArticleViewType) => {
        return () => {
            onViewClick(newView)
        }
    }
    // @ts-ignore
    return (
        <div >
            {viewType.map((viewType) => (
                <Button

                    buttonTheme={ButtonTheme.CLEAR} onClick={click(viewType.view)}>
                    <Icon
                        className={classNames('', {[cls.notSelected] : viewType.view !== view}, [])}// change color selected view type
                        Svg={viewType.icon}/>
                </Button>
            ))}
        </div>
    );
};
