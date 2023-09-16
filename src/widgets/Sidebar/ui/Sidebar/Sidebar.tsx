import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss'
import {memo, useMemo, useState} from "react";
import {ThemeSwitcher} from "@/features/ThemeSwitcher";
import {LangSwitcher} from "@/features/LangSwitcher/LangSwitcher";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/deprecated/Button";
import {SidebarItem} from "../SidebarItem/SidebarItem";
import {useSelector} from "react-redux";
import {getSidebarItems} from "../../model/selectors/getSidebarItems";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {ToggleFeatures} from "@/shared/lib/features";
import {AppLogo} from "@/shared/ui/redesigned/AppLogo";
import {Icon} from "@/shared/ui/redesigned/Icon";
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'

interface SideBarProps {
    className?: string;
}

const Sidebar = memo(({className}: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false)

    const sidebarItemsList = useSelector(getSidebarItems)
    const onToggle = () => {
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
                    className={classNames(cls.SidebarRedesigned, {[cls.collapsedRedesigned]: collapsed}, [className])}
                >
                    <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo}/>

                    <VStack align={'start'} role={'navigation'} gap={'8'} className={cls.items}>
                        {itemsList}
                    </VStack>

                    <Icon
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapsedBtn}
                        Svg={ArrowIcon}
                        clickable
                    />

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