import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticlesViewSelector.module.scss'
import {memo} from "react";
import {ArticleView} from "@/entities/Article";

import ListIconDeprecated from "@/shared/assets/icons/list-24-24.svg"
import TilesIconDeprecated from "@/shared/assets/icons/tiled-24-24.svg"

import TiledIcon from "@/shared/assets/icons/tile.svg"
import ListIcon from "@/shared/assets/icons/burger.svg"

import {Button as ButtonDeprecated, ButtonTheme} from "@/shared/ui/deprecated/Button";
import {Icon as IconDeprecated} from "@/shared/ui/deprecated/Icon";
import {ToggleFeatures, toggleFeatures} from "@/shared/lib/features";
import {Icon} from "@/shared/ui/redesigned/Icon";
import {Card} from "@/shared/ui/redesigned/Card";
import {HStack} from "@/shared/ui/redesigned/Stack";

interface ArticleViewSelectorProps {
    className?: string;
    view?: ArticleView;
    onViewClick?: (view: ArticleView) => void
}


const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TilesIconDeprecated
        })
    },
    {
        view: ArticleView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated
        })
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
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Card
                    border={'round'}
                    className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}
                >
                    <HStack>
                        {viewTypes.map((viewType, index) => (
                            <Icon
                                key={index}
                                clickable
                                onClick={onClick(viewType.view)}
                                width={24}
                                height={24}
                                className={classNames('', {[cls.notSelected]: viewType.view !== view})}
                                Svg={viewType.icon}
                            />
                        ))}
                    </HStack>
                </Card>
            }
            off={
                <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
                    {viewTypes.map((viewType, index) => (
                        <ButtonDeprecated
                            key={index}
                            theme={ButtonTheme.CLEAR}
                            onClick={onClick(viewType.view)}
                        >
                            <IconDeprecated
                                width={24}
                                height={24}
                                className={classNames('', {[cls.notSelected]: viewType.view !== view})}
                                Svg={viewType.icon}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />

    );
});
