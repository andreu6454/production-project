import {classNames} from "shared/lib/classNames/classNames";
import cls from './Input.module.scss'
import {ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState} from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string,
    onChange?: (value: string) => void,
    autofocus?: boolean
}

export const Input = memo((props: InputProps) => {

    const {
        className,
        value ,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        ...otherProps
    } = props

    useEffect(() => {
        if(autofocus){
            setIsFocused(true)
            ref.current.focus()
        }
    }, [autofocus]);

    const ref = useRef<HTMLInputElement>(null)
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

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && <div className={cls.placeholder}>
                {`${placeholder}>`}
            </div>}
            <div className={cls.caretWrapper}>
                <input className={cls.input}
                       type={type}
                       value={value}
                       onChange={onChangeHandler}
                       onBlur={onBlur}
                       onFocus={onFocus}
                       onSelect={onSelect}
                       ref={ref}
                       {...otherProps}
                />
                {isFocused && (<span
                    style={{left: `${caretPosition * 8}px`}}
                    className={cls.caret}
                />)}
            </div>
        </div>
    );
});
