import {classNames} from "shared/lib/classNames";
import cls from "./SideBar.module.scss"
import React, {useState} from "react";
import {Button} from "shared/ui/button/Button";
import {ThemeSwitcher} from "widgets/themeSwitcher";
export interface SideBarProps {
    className?: string;
}
export const SideBar = ({className}:SideBarProps) => {
    const [collapse, setCollapsed] = useState(false); // сайд бар развернут или свернут
    const onToggle = () => {
        setCollapsed(prevState => !prevState);
    }
    return (
        <div className={classNames(cls.SideBar, {[cls.collapsed]: collapse}, [className])}>
           <button onClick={onToggle}>toggle</button>
            <div className={classNames(cls.switchers)}>
                <ThemeSwitcher/>
            </div>
            {/*<div><LangSwitcher/></div> TODO */}
        </div>
    );
};
