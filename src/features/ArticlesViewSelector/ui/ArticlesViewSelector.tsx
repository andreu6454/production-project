import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticlesViewSelector.module.scss'
import {memo} from "react";
import {ArticleView} from "@/entities/Article";
import ListIcon from "@/shared/assets/icons/list-24-24.svg"
import TilesIcon from "@/shared/assets/icons/tiled-24-24.svg"
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {Icon} from "@/shared/ui/Icon/Icon";

interface ArticleViewSelectorProps {
    className?: string;
    view?: ArticleView;
    onViewClick?: (view: ArticleView) => void
}


const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: TilesIcon
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon
    },
]
export const ArticlesViewSelector = memo((props: ArticleViewSelectorProps) => {
    const {className, view, onViewClick} = props

    const onClick = (newView: ArticleView) => {
        return () => {
            onViewClick?.(newView);
        }
    }

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType, index) => (
                <Button
                    key={index}
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                >
                    <Icon
                        className={classNames('', {[cls.notSelected]: viewType.view !== view})}
                        Svg={viewType.icon}
                    />
                </Button>
            ))}
        </div>
    );
});
