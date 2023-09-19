import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from './Input.module.scss'
import {ChangeEvent, InputHTMLAttributes, memo, MutableRefObject, ReactNode, useEffect, useRef, useState} from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string,
    onChange?: (value: string) => void,
    autofocus?: boolean,
    readOnly?: boolean,
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
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

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
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
    );
});
