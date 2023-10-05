import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './SuggestionsItem.module.scss'
import {memo, ReactNode} from "react";
import {Card} from "@/shared/ui/redesigned/Card";
import {AppLink} from "@/shared/ui/redesigned/AppLink";
import {Text} from "@/shared/ui/redesigned/Text";
import {VStack} from "@/shared/ui/redesigned/Stack";


interface SuggestionsItemProps {
    className?: string;
    title?: string;
    img: ReactNode;
    description?: string;
    to: string;
}

export const SuggestionsItem = memo((props: SuggestionsItemProps) => {
    const {
        className,
        title,
        img,
        description,
        to
    } = props

    return (
        <Card padding={'0'} border={"partial"} className={classNames(cls.SuggestionsItem, {}, [className])}>
            <AppLink to={to}>
                <VStack max gap={'16'} align={'center'}>
                    {img}
                    <div className={cls.container}>
                        <Text variant={'accent'} size={'l'} align={'center'} title={title}/>
                        <Text size={'m'} align={'center'} text={description}/>
                    </div>
                </VStack>
            </AppLink>
        </Card>
    );
});
