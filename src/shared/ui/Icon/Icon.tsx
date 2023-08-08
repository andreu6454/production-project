import {classNames} from "shared/lib/classNames/classNames";
import cls from './Icon.module.scss'
import {memo, SVGProps, VFC} from "react";

interface IconProps {
    className?: string;
    Svg: VFC<SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({className, Svg}: IconProps) => {

    return (
        <Svg className={classNames(cls.Icon, {}, [className])}/>
    );
});
