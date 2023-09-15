import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss'
import {memo, useMemo, useState} from "react";
import {ThemeSwitcher} from "@/features/ThemeSwitcher";
import {LangSwitcher} from "@/features/LangSwitcher/LangSwitcher";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button";
import {SidebarItem} from "../SidebarItem/SidebarItem";
import {useSelector} from "react-redux";
import {getSidebarItems} from "../../model/selectors/getSidebarItems";
import {VStack} from "@/shared/ui/Stack";
import {ToggleFeatures} from "@/shared/lib/features";
import {AppLogo} from "@/shared/ui/AppLogo";

interface SideBarProps {
    className?: string;
}

const Sidebar = memo(({className}: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false)

    const sidebarItemsList = useSelector(getSidebarItems)
    const onToggle = () => {
        console.log(123)
        setCollapsed(prevState => !prevState)
    }

    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed}
        />
    )), [collapsed, sidebarItemsList])


    return (
        <ToggleFeatures
            feature={"isAppRedesigned"}
            off={
                <aside
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

                    <VStack role={'navigation'} gap={'0'} className={cls.items}>
                        {itemsList}
                    </VStack>

                    <div className={cls.switchers}>

                        <ThemeSwitcher/>
                        <LangSwitcher short={collapsed} className={cls.lang}/>

                    </div>
                </aside>
            }
            on={
                <aside
                    data-testid="sidebar"
                    className={classNames(cls.SidebarRedesigned, {[cls.collapsed]: collapsed}, [className])}
                >
                    <AppLogo className={cls.appLogo}/>

                    <VStack role={'navigation'} gap={'0'} className={cls.items}>
                        {itemsList}
                    </VStack>

                    <div className={cls.switchersRedesigned}>

                        <ThemeSwitcher/>
                        <LangSwitcher short={collapsed} className={cls.lang}/>

                    </div>
                </aside>
            }
        />
    )
});

export default Sidebar