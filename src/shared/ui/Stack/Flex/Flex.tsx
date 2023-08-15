import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './Flex.module.scss'
import {DetailedHTMLProps, HTMLAttributes, memo, ReactNode} from "react";


export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '0' | '4' | '8' | '16' | '32'

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
}
const gapClasses: Record<FlexGap, string> = {
    0: cls.gap0,
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
}
const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
}
const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
}

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps{
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    max?: boolean;

}

export const Flex = memo((props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap = '4',
        max,
        ...other
    } = props

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gapClasses[gap]
    ]

    const mods: Mods = {
        [cls.max]: max,
    }

    return (
        <div
            className={classNames(cls.Flex, mods, classes)}
            {...other}
        >
            {children}
        </div>
    );
});
