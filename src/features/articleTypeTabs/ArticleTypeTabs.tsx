import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useCallback, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {Tabs as TabDeprecated} from "@/shared/ui/deprecated/Tabs";
import {ArticleType} from "@/entities/Article";
import {ToggleFeatures} from "@/shared/lib/features";
import {Tabs, TabItem} from "@/shared/ui/redesigned/Tabs";

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType,
    onChangeType: (type: ArticleType) => void
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const {className, value, onChangeType} = props
    const {t} = useTranslation('article')

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: t("Все")
        },
        {
            value: ArticleType.IT,
            content: t("Айти")
        },
        {
            value: ArticleType.ECONOMICS,
            content: t("Экономика")
        },
        {
            value: ArticleType.SCIENCE,
            content: t("Наука")
        },
    ], [t])


    const onTabClick = useCallback((tab: TabItem) => {
        onChangeType(tab.value as ArticleType)
    }, [onChangeType])

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Tabs
                    direction={"column"}
                    align={'start'}
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
            off={
                <TabDeprecated
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
        />
    );
});
