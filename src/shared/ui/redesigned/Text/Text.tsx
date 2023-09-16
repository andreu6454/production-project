import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Text.module.scss'
import {memo} from "react";


export type TextVariant = "primary" | "error" | "accent"

export type TextAlign = "right" | "left" | "center"

export type TextSize = "s" | "m" | "l"


interface TextProps {
    className?: string;
    title?: string,
    text?: string,
    variant?: string,
    align?: TextAlign,
    size?: TextSize
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToClass: Record<TextSize, string> = {
    s: 'size_s',
    m: 'size_m',
    l: 'size_l',
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
}


export const Text = memo((props: TextProps) => {

    const {
        className,
        title,
        text,
        variant = 'primary',
        align = 'left',
        size = "m"
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]
    const sizeClass = mapSizeToClass[size]

    const additionalClass = [className, cls[variant], cls[align], cls[sizeClass]]

    return (
        <div className={classNames(cls.Text, {}, additionalClass)}>
            {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
