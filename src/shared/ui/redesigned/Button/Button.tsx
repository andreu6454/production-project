import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from './Button.module.scss'
import {ButtonHTMLAttributes, FC, memo} from "react";

export type ButtonVariant = "clear" | "clearInverted" | "outline" | "outline_red" | "background" | "backgroundInverted"

export type ButtonSize = 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    fullWidth?: boolean;
}


export const Button: FC<ButtonProps> = memo((props) => {

    const {
        className,
        children,
        variant = "outline",
        square,
        size = 'm',
        disabled,
        fullWidth,
        ...otherProps
    } = props


    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWhidth]: fullWidth,
    }
    return (
        <button
            className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
