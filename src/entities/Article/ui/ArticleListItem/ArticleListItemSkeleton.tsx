import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticleListItem.module.scss'
import {ArticleView} from "../../model/types/article";
import {Card} from "@/shared/ui/Card/Card";
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = (props: ArticleListItemSkeletonProps) => {
    const {className, view} = props

    if (view === ArticleView.BIG) {
        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.header}>
                        <Skeleton width={30} height={30} border={"50%"}/>
                        <Skeleton className={cls.userName} width={150} height={16}/>
                        <Skeleton className={cls.date} width={150} height={16}/>
                    </div>
                    <Skeleton width={250} height={24} className={cls.title}/>
                    <Skeleton height={200} className={cls.img}/>
                    <div className={cls.footer}>
                        <Skeleton height={36} width={200}/>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card>
                <div className={cls.imgWrapper}>
                    <Skeleton width={200} height={200}/>
                </div>
                <div className={cls.infoWrapper}>
                    <Skeleton width={130} height={16}/>
                </div>
                <Skeleton width={150} height={16} className={cls.infoWrapper}/>
            </Card>
        </div>
    )
};
