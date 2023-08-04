import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './Input.module.scss'
import {ChangeEvent, InputHTMLAttributes, memo, MutableRefObject, useEffect, useRef, useState} from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string,
    onChange?: (value: string) => void,
    autofocus?: boolean,
    readOnly?: boolean
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
    const [caretPosition, setCaretPosition] = useState(0)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
        setCaretPosition(e.target.value.length)
    }

    const onBlur = () => {
        setIsFocused(false)
    }
    const onFocus = () => {
        setIsFocused(true)
    }
    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0)
    }

    const mods: Mods = {
        [cls.readonly]: readOnly
    }

    const isCaretVisible = isFocused && !readOnly


    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            {placeholder && <div className={cls.placeholder}>
                {`${placeholder}>`}
            </div>}
            <div className={cls.caretWrapper}>
                <input
                    readOnly={readOnly}
                    className={cls.input}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSelect={onSelect}
                    ref={ref}
                    {...otherProps}
                />
                {isCaretVisible && (<span
                    style={{left: `${caretPosition * 8}px`}}
                    className={cls.caret}
                />)}
            </div>
        </div>
    );
});
