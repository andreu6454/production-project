import cls from './DropDown.module.scss'
import {Menu} from '@headlessui/react'
import {classNames} from "@/shared/lib/classNames/classNames";
import {Fragment, ReactNode} from "react";
import {DropDownDirection} from "@/shared/types/ui";
import {AppLink} from "@/shared/ui/deprecated/AppLink";
import {mapDirection} from "../../styles/consts";
import popupCls from '../../styles/popup.module.scss'

export interface DropDownItem {
    content: ReactNode,
    disabled?: boolean,
    onClick?: () => void,
    href?: string
}

interface DropDownProps {
    className?: string;
    items: DropDownItem[],
    trigger?: ReactNode,
    direction?: DropDownDirection
}


/**
 * Устарел, используем новые компонент из папки redesigned
 * @deprecated
 */
export const DropDown = (props: DropDownProps) => {
    const {
        className,
        items,
        trigger,
        direction = 'bottom-right'
    } = props

    const menuClasses = [cls.options, mapDirection[direction]]

    return (
        <Menu
            as={'div'}
            className={classNames(cls.DropDown, {}, [className, popupCls.popup])}
        >
            <Menu.Button className={popupCls.trigger}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                        const content = ({active}: { active: boolean }) => (
                            <button
                                disabled={item.disabled}
                                type={'button'}
                                onClick={item.onClick}
                                className={classNames(cls.item, {[cls.itemActive]: active})}
                            >
                                {item.content}
                            </button>)

                        if (item.href) {
                            return (
                                <Menu.Item
                                    as={AppLink}
                                    to={item.href}
                                    disabled={item.disabled}
                                    key={'dropdown-key-' + index}
                                >
                                    {content}
                                </Menu.Item>
                            )
                        }
                        return (
                            <Menu.Item
                                as={Fragment}
                                disabled={item.disabled}
                                key={'dropdown-key-' + index}
                            >

                                {content}
                            </Menu.Item>)
                    }
                )}
            </Menu.Items>
        </Menu>
    )
};

