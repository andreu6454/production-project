import {memo} from "react";
import {ArticlesFilters} from "@/widgets/ArticlesFilters";
import {useArticleFilters} from "@/pages/ArticlesPage/lib/hooks/useArticleFilters";

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const {className} = props

    const {
        sort,
        search,
        onChangeSearch,
        onChangeType,
        type,
        onChangeSort,
        onChangeOrder,
        order
    } = useArticleFilters()

    return (
        <ArticlesFilters
            search={search}
            sort={sort}
            type={type}
            order={order}
            onChangeOrder={onChangeOrder}
            onChangeSearch={onChangeSearch}
            onChangeType={onChangeType}
            onChangeSort={onChangeSort}
            className={className}
        />
    );
});
