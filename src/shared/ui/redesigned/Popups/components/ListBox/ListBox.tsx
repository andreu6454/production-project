import {Fragment, ReactNode, useMemo} from "react";
import {Listbox as HListBox} from "@headlessui/react";
import cls from './ListBox.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";
import {Button} from "@/shared/ui/redesigned/Button";
import {HStack} from "@/shared/ui/redesigned/Stack";
import {DropDownDirection} from "@/shared/types/ui";
import {mapDirection} from "../../styles/consts";
import popupCls from '../../styles/popup.module.scss'
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg"
import {Icon} from "@/shared/ui/redesigned/Icon";

export interface ListBoxItems<T extends string> {
    value: T,
    content: ReactNode,
    disabled?: boolean
}


interface ListBoxProps<T extends string> {
    className?: string;
    items: ListBoxItems<T>[]
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void,
    readonly?: boolean,
    direction?: DropDownDirection,
    label?: string
}


export function ListBox<T extends string>(props: ListBoxProps<T>) {
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

    const optionsClasses = [cls.options, mapDirection[direction], popupCls.menu]


    const selectedItem = useMemo(() => {
        return items.find(item => item.value === value)
    }, [items, value])

    return (
        <HStack>
            {label && <span className={cls.label}>{label}</span>}
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

                    <Button
                        addonRight={<Icon Svg={ArrowIcon}/>}
                        variant={'filled'}
                        disabled={readonly}
                    >
                        {selectedItem?.content ?? defaultValue}
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
                                        [cls.active]: active,
                                        [cls.selected]: value === item.content,
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
}
