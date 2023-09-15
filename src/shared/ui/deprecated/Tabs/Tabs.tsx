import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Tabs.module.scss'
import {memo, ReactNode, useCallback} from "react";
import {Card, CardTheme} from "@/shared/ui/deprecated/Card";


export interface TabItem {
    value: string,
    content: ReactNode
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string,
    onTabClick: (tab: TabItem) => void
}

/**
 * Устарел, используем новые компонент из папки redesigned
 * @deprecated
 */
export const Tabs = memo((props: TabsProps) => {
    const {
        className,
        tabs,
        value,
        onTabClick
    } = props

    const clickHandle = useCallback((tab: TabItem) => {
        return () => {
            onTabClick(tab)
        }
    }, [])

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    onClick={clickHandle(tab)}
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    className={cls.tab}
                    key={tab.value}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
