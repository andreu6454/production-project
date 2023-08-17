import {classNames} from "shared/lib/classNames/classNames";
import cls from './Icon.module.scss'
import {memo, SVGProps, VFC} from "react";

interface IconProps {
    className?: string;
    Svg: VFC<SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
    const {className, Svg, inverted} = props

    return (
        <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])}/>
    );
});
