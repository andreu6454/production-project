import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import cls from './RatingCard.module.scss';
import {memo, useCallback, useState} from 'react';
import {Card} from "@/shared/ui/Card";
import {HStack, VStack} from "@/shared/ui/Stack";
import {Text, TextAlign} from "@/shared/ui/Text";
import {StarRating} from "@/shared/ui/StarRating";
import {Modal} from "@/shared/ui/Modal";
import {Input} from "@/shared/ui/Input";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button";
import {BrowserView, MobileView} from "react-device-detect";
import {Drawer} from "@/shared/ui/Drawer";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedback?: string) => void
    rate?: number
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        rate = 0,
        onAccept
    } = props;
    const {t} = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [starsCount, setStarsCount] = useState(rate)
    const [feedback, setFeedback] = useState('')

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount)
        if (hasFeedback) {
            setIsModalOpen(true)
        } else {
            onAccept?.(selectedStarsCount)
        }
    }, [hasFeedback, onAccept])


    const acceptHandle = useCallback(() => {
        setIsModalOpen(false)
        onAccept?.(starsCount, feedback)
    }, [feedback, onAccept, starsCount])

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false)
        onCancel?.(starsCount)
    }, [onAccept, starsCount])

    const modalContent = (
        <>
            <Text align={TextAlign.CENTER} title={feedbackTitle}/>
            <Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')}/>
        </>
    )

    return (
        <Card max className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align={'center'} gap={'8'} max>
                <Text title={starsCount ? t('Спасибо за оценку!') : title}/>
                <StarRating size={40} onSelect={onSelectStars} selectedStars={starsCount}/>
            </VStack>

            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap={'32'} align={'start'}>
                        {modalContent}
                        <HStack max justify={'end'} gap={'16'}>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={acceptHandle}
                            >
                                {t('Отправить')}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={cancelHandle}
                            >
                                {t('Закрыть')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    <VStack max gap={'32'}>
                        {modalContent}
                        <VStack max gap={'32'}>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={acceptHandle}
                                size={ButtonSize.XL}
                                fullWidth
                            >
                                {t('Отправить')}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={cancelHandle}
                            >
                                {t('Закрыть')}
                            </Button>
                        </VStack>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});