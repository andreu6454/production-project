import {Fragment, memo, ReactNode} from "react";
import {Listbox as HListBox} from "@headlessui/react";
import cls from './ListBox.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";
import {Button} from "@/shared/ui/Button";
import {HStack} from "@/shared/ui/Stack";
import {DropDownDirection} from "@/shared/types/ui";
import {mapDirection} from "../../styles/consts";
import popupCls from '../../styles/popup.module.scss'

export interface ListBoxItems {
    value: string,
    content: ReactNode,
    disabled?: boolean
}


interface ListBoxProps {
    className?: string;
    items: ListBoxItems[]
    value?: string;
    defaultValue?: string;
    onChange: <T extends string>(value: T) => void,
    readonly?: boolean,
    direction?: DropDownDirection,
    label?: string
}

export const ListBox = memo((props: ListBoxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom-left',
        label
    } = props

    const optionsClasses = [cls.options, mapDirection[direction]]

    return (
        <HStack>
            {label && <span className={cls.label}>{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as={'div'}
                className={classNames(
                    cls.ListBox,
                    {[cls.disabled]: readonly},
                    [className, popupCls.popup])
                }
                value={value}
                onChange={onChange}
            >
                <HListBox.Button className={popupCls.trigger}>

                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames('', {}, optionsClasses)}>
                    {items.map((item) => (

                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({active}) => (
                                <li className={
                                    classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.selected]: value === item.content,
                                        [popupCls.disabled]: item.disabled,
                                    })
                                }
                                >
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    )
});
