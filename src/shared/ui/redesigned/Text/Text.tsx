import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Text.module.scss'
import {memo} from "react";


export type TextVariant = "primary" | "error" | "accent"

export type TextAlign = "right" | "left" | "center"

export type TextSize = "s" | "m" | "l"

export type TextOpacity = "100%" | "80%"


interface TextProps {
    className?: string;
    title?: string,
    text?: string,
    variant?: TextVariant,
    align?: TextAlign,
    size?: TextSize,
    bold?: boolean,
    Opacity?: TextOpacity,
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

const mapOpacityToHeaderTag: Record<TextOpacity, string> = {
    "100%": 'opacity100',
    "80%": 'opacity80',
}


export const Text = memo((props: TextProps) => {

    const {
        className,
        title,
        text,
        variant = 'primary',
        align = 'left',
        size = "m",
        Opacity= '100%',
        bold
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]
    const sizeClass = mapSizeToClass[size]
    const opacity = mapOpacityToHeaderTag[Opacity]

    const additionalClass = [className, cls[variant], cls[align], cls[sizeClass], cls[opacity]]

    return (
        <div className={classNames(cls.Text, {[cls.bold]: bold}, additionalClass)}>
            {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
