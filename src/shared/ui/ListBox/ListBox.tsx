import {Fragment, memo, ReactNode} from "react";
import {Listbox as HListBox} from "@headlessui/react";
import cls from './ListBox.module.scss'
import {classNames} from "shared/lib/classNames/classNames";
import {Button} from "shared/ui/Button/Button";
import {HStack} from "shared/ui/Stack";


export interface ListBoxItems {
    value: string,
    content: ReactNode,
    disabled?: boolean
}

type DropDownDirection = 'top' | 'bottom'

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

const mapDirection: Record<DropDownDirection, string> = {
    bottom: cls.optionsBottom,
    top: cls.optionsTop
}
export const ListBox = memo((props: ListBoxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom',
        label
    } = props

    const optionsClasses = [cls.options, mapDirection[direction]]

    return (
        <HStack className={classNames('', {[cls.disabled]: readonly}, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as={'div'}
                className={classNames(cls.ListBox, {[cls.disabled]: readonly})}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button className={cls.trigger}>

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
                                        [cls.active]: active,
                                        [cls.selected]: value === item.content,
                                        [cls.disabled]: item.disabled,
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
