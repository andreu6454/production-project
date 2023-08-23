import {memo, ReactNode} from "react";
import {Popover as HPopover} from "@headlessui/react";
import cls from './Popover.module.scss'
import {DropDownDirection} from "@/shared/types/ui";
import {mapDirection} from "../../styles/consts";
import popupCls from '../../styles/popup.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";

interface PopoverProps {
    className?: string;
    trigger?: ReactNode,
    direction?: DropDownDirection;
    children?: ReactNode;
}

export const Popover = memo((props: PopoverProps) => {

    const {
        className,
        trigger,
        children,
        direction = 'bottom-right'
    } = props

    const menuClasses = [cls.options, mapDirection[direction]]

    return (
        <HPopover
            className={classNames('', {}, [className, popupCls.popup])}
        >
            <HPopover.Button as={'div'} className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
});
