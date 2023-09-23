import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from './Button.module.scss'
import {ButtonHTMLAttributes, FC, ForwardedRef, forwardRef, ReactNode} from "react";

export type ButtonVariant = "clear" | "clearInverted" | 'outline' | 'filled'
export type ButtonColor = "normal" | "success" | 'error'

export type ButtonSize = 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    color?: ButtonColor;
    square?: boolean;
    size?: ButtonSize;
    fullWidth?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    Disabled?: boolean;
}


export const Button: FC<ButtonProps> = forwardRef((props, ref: ForwardedRef<HTMLButtonElement>) => {

    const {
        className,
        children,
        variant = "outline",
        square,
        size = 'm',
        fullWidth,
        Disabled,
        addonLeft,
        addonRight,
        color = 'normal',
        ...otherProps
    } = props


    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: Disabled,
        [cls.fullWhidth]: fullWidth,
        [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    }
    return (
        <button
            className={classNames(cls.Button, mods, [className, cls[variant], cls[size], cls[color]])}
            disabled={Disabled}
            {...otherProps}
            ref={ref}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>
    );
});
