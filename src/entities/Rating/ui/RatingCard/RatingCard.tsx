import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import cls from './RatingCard.module.scss';
import {memo, useCallback, useState} from 'react';
import {Card as CardDeprecaated} from "@/shared/ui/deprecated/Card";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {Text as TextDeprecated, TextAlign} from "@/shared/ui/deprecated/Text";
import {StarRating} from "@/shared/ui/redesigned/StarRating";
import {Modal} from "@/shared/ui/redesigned/Modal";
import {Input as InputDeprecated} from "@/shared/ui/deprecated/Input";
import {Button as ButtonDeprecated, ButtonSize, ButtonTheme} from "@/shared/ui/deprecated/Button";
import {BrowserView, MobileView} from "react-device-detect";
import {Drawer} from "@/shared/ui/redesigned/Drawer";
import {ToggleFeatures} from "@/shared/lib/features";
import {Text} from "@/shared/ui/redesigned/Text";
import {Input} from "@/shared/ui/redesigned/Input";
import {Button} from "@/shared/ui/redesigned/Button";
import {Card} from "@/shared/ui/redesigned/Card";

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
            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={
                    <>
                        <Text align={'center'} title={feedbackTitle}/>
                        <Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')}/>
                    </>
                }
                off={
                    <>
                        <TextDeprecated align={TextAlign.CENTER} title={feedbackTitle}/>
                        <InputDeprecated value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')}/>
                    </>
                }
            />
        </>
    )

    const Content = (
        <>
            <VStack align={'center'} gap={'8'} max>
                <ToggleFeatures
                    feature={'isAppRedesigned'}
                    on={
                        <Text title={starsCount ? t('Спасибо за оценку!') : title}/>
                    }
                    off={
                        <TextDeprecated title={starsCount ? t('Спасибо за оценку!') : title}/>
                    }
                />
                <StarRating size={40} onSelect={onSelectStars} selectedStars={starsCount}/>
            </VStack>

            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap={'32'} align={'start'}>
                        {modalContent}
                        <ToggleFeatures
                            feature={'isAppRedesigned'}
                            on={
                                <HStack max justify={'end'} gap={'16'}>
                                    <Button
                                        variant={'outline'}
                                        onClick={acceptHandle}
                                    >
                                        {t('Отправить')}
                                    </Button>
                                    <Button
                                        variant={'outline-red'}
                                        onClick={cancelHandle}
                                    >
                                        {t('Закрыть')}
                                    </Button>
                                </HStack>
                            }
                            off={
                                <HStack max justify={'end'} gap={'16'}>
                                    <ButtonDeprecated
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={acceptHandle}
                                    >
                                        {t('Отправить')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        theme={ButtonTheme.OUTLINE_RED}
                                        onClick={cancelHandle}
                                    >
                                        {t('Закрыть')}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    <VStack max gap={'32'}>
                        {modalContent}
                        <ToggleFeatures
                            feature={'isAppRedesigned'}
                            on={
                                <HStack max justify={'end'} gap={'16'}>
                                    <VStack max gap={'32'}>
                                        <Button
                                            variant={'outline'}
                                            onClick={acceptHandle}
                                            size={'xl'}
                                            fullWidth
                                        >
                                            {t('Отправить')}
                                        </Button>
                                        <Button
                                            variant={'outline-red'}
                                            onClick={cancelHandle}
                                        >
                                            {t('Закрыть')}
                                        </Button>
                                    </VStack>
                                </HStack>
                            }
                            off={
                                <HStack max justify={'end'} gap={'16'}>
                                    <VStack max gap={'32'}>
                                        <ButtonDeprecated
                                            theme={ButtonTheme.OUTLINE}
                                            onClick={acceptHandle}
                                            size={ButtonSize.XL}
                                            fullWidth
                                        >
                                            {t('Отправить')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            theme={ButtonTheme.OUTLINE_RED}
                                            onClick={cancelHandle}
                                        >
                                            {t('Закрыть')}
                                        </ButtonDeprecated>
                                    </VStack>
                                </HStack>
                            }
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    )

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Card max padding={'24'} border={'round'} className={classNames(cls.RatingCard, {}, [className])}>
                    {Content}
                </Card>
            }
            off={
                <CardDeprecaated max className={classNames(cls.RatingCard, {}, [className])}>
                    {Content}
                </CardDeprecaated>
            }
        />
    );
});