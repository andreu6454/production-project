import {memo} from "react";
import {Icon} from "@/shared/ui/redesigned/Icon";
import CircleIcon from '@/shared/assets/icons/circle-up.svg'

export const ScrollToTopButton = memo(() => {
    const onClick = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    return (
        <Icon
            Svg={CircleIcon}
            width={32}
            height={32}
            clickable
            onClick={onClick}
        />
    );
});
