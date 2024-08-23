import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Tabs.module.scss"
import {Card, CardTheme} from "shared/ui/card/Card";
import {useCallback} from "react";


export interface TabItem{
    value: string,
    content: React.ReactNode,
}
export interface TabsProps {
    className?: string,
    tabs: TabItem[], // list of tabs
    value: string, // selected tab
    onTabClick: (tab:TabItem) => void; // change tab
}
export const Tabs = ({className, onTabClick, tabs, value}:TabsProps) => {
    const clickHandle = useCallback((tab:TabItem) => {
        return () => {
            onTabClick(tab);
        }
    }, [onTabClick])
    return (
        <div className={classNames(cls.Tabs, {}, [className])}>

            {tabs.map(tab => (
                <Card
                    onClick={clickHandle(tab)}
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED} // mark selected tab
                    className={cls.tab}>
                    {tab.content}
                </Card>
            ))}


        </div>
    );
};
