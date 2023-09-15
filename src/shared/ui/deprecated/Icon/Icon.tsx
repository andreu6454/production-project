import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Icon.module.scss'
import {memo, SVGProps, VFC} from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    Svg: VFC<SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

/**
 * Устарел, используем новые компонент из папки redesigned
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        inverted,
        ...otherProps
    } = props

    return (
        <Svg
            className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])}
            {...otherProps}
        />
    );
});
