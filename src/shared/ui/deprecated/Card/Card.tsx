import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Card.module.scss'
import {HTMLAttributes, memo, ReactNode} from "react";


export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    max?: boolean;
}

/**
 * Устарел, используем новые компонент из папки redesigned
 * @deprecated
 */
export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        max = false,
        ...otherProps
    } = props


    return (
        <div
            className={classNames(cls.Card, {[cls.max]: max}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
