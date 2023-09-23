import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from './Input.module.scss'
import {ChangeEvent, InputHTMLAttributes, memo, MutableRefObject, ReactNode, useEffect, useRef, useState} from "react";
import {HStack} from "@/shared/ui/redesigned/Stack";
import {Text} from "@/shared/ui/redesigned/Text";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'size'>

type InputSize = 's' | 'm' | 'l'

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number,
    onChange?: (value: string) => void,
    autofocus?: boolean,
    readOnly?: boolean,
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    label?: string;
    size?: InputSize
}

export const Input = memo((props: InputProps) => {

    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readOnly,
        addonLeft,
        addonRight,
        label,
        size = 'm',
        ...otherProps
    } = props
    const ref = useRef() as MutableRefObject<HTMLInputElement>

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true)
            ref.current.focus()
        }
    }, [autofocus]);


    const [isFocused, setIsFocused] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    const onBlur = () => {
        setIsFocused(false)
    }
    const onFocus = () => {
        setIsFocused(true)
    }


    const mods: Mods = {
        [cls.readonly]: readOnly,
        [cls.isFocused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    }

    const Input = <div className={classNames(cls.InputWrapper, mods, [className, cls[size]])}>
        <div className={cls.addonLeft}>{addonLeft}</div>
        <input
            placeholder={placeholder}
            readOnly={readOnly}
            className={cls.input}
            type={type}
            value={value}
            onChange={onChangeHandler}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={ref}
            {...otherProps}
        />
        <div className={cls.addonRight}>{addonRight}</div>
    </div>

    if (label) {
        return (
            <HStack max gap={'8'}>
                <Text text={label}/>
                {Input}
            </HStack>
        )
    }

    return Input;
});
