import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Tabs.module.scss'
import {memo, ReactNode, useCallback} from "react";
import {Card} from "@/shared/ui/redesigned/Card";
import {Flex} from "@/shared/ui/redesigned/Stack";
import {FlexAlign, FlexDirection} from "@/shared/ui/redesigned/Stack/Flex/Flex";


export interface TabItem {
    value: string,
    content: ReactNode
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
    align?: FlexAlign
}

export const Tabs = memo((props: TabsProps) => {
    const {
        className,
        tabs,
        value,
        direction = 'row',
        align,
        onTabClick
    } = props

    const clickHandle = useCallback((tab: TabItem) => {
        return () => {
            onTabClick(tab)
        }
    }, [])

    return (
        <Flex
            align={align}
            direction={direction}
            gap={'8'}
            className={classNames(cls.Tabs, {}, [className])}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === value
                return (
                    <Card
                        onClick={clickHandle(tab)}
                        variant={isSelected ? 'light' : 'normal'}
                        className={classNames(cls.tab, {[cls.selected]:isSelected})}
                        key={tab.value}
                        border={'round'}
                    >
                        {tab.content}
                    </Card>
                )
            })}
        </Flex>
    );
});
