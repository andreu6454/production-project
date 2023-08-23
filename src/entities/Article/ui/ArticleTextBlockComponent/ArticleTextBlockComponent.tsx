import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticleTextBlockComponent.module.scss'
import {memo} from "react";
import {ArticleTextBlock} from "../../model/types/article";
import {Text} from "@/shared/ui/Text";

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(({className, block}: ArticleTextBlockComponentProps) => {


    return (
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
            {block.title && (<Text className={cls.title} title={block.title}/>)}
            {block.paragraphs.map((paragraph) => (
                <Text key={paragraph} text={paragraph} className={cls.paragraph} />
            ))}
        </div>
    );
});
