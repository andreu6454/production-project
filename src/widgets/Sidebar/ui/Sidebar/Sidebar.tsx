import {classNames} from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss'
import {memo, useMemo, useState} from "react";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";
import {LangSwitcher} from "widgets/LangSwitcher/LangSwitcher";
import {Button, ButtonSize, ButtonTheme} from "shared/ui/Button/Button";
import {SidebarItemsList} from "../../model/items";
import {SidebarItem} from "../SidebarItem/SidebarItem";

interface SideBarProps {
    className?: string;
}

const Sidebar = memo(({className}: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const onToggle = () => {
        setCollapsed(prevState => !prevState)
    }

    const itemsList = useMemo(() => SidebarItemsList.map((item) => (
        <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed}
        />
    )), [collapsed])

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
        >

            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapsedBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
            >
                {collapsed ? ">" : "<"}
            </Button>

            <div className={cls.items}>
                {itemsList}
            </div>

            <div className={cls.switchers}>

                <ThemeSwitcher/>
                <LangSwitcher short={collapsed} className={cls.lang}/>

            </div>
        </div>
    );
});

export default Sidebar