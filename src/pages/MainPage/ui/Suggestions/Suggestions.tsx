import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Suggestions.module.scss'
import {memo} from "react";
import {useTranslation} from "react-i18next";
import {getRouteArticles, getRouteMovies} from "@/shared/const/router";
import {HStack} from "@/shared/ui/redesigned/Stack";
import {SuggestionsItem} from "../SuggestionsItem/SuggestionsItem";
import {AppImage} from "@/shared/ui/redesigned/AppImage";
import movieImg from '@/shared/assets/images/movieImg.png'
import articleImg from '@/shared/assets/images/articleImg.png'

interface SuggestionsProps {
    className?: string;
}

export const Suggestions = memo((props: SuggestionsProps) => {
    const {className} = props
    const {t} = useTranslation()

    const suggestions = [
        {
            title: t('Статьи'),
            to: getRouteArticles(),
            description: t('Здесь вы можете искать и просматривать статьи на различные темы!'),
            img:
                <AppImage
                    className={cls.SuggestionsImg}
                    width={'100%'}
                    height={'50%'}
                    src={articleImg}
                    alt={'app'}
                />
        },
        {
            title: t('Фильмы'),
            to: getRouteMovies(),
            description: t('Здесь вы можете найти фильм и информацию о нем!'),
            img:
                <AppImage
                    className={cls.SuggestionsImg}
                    width={'100%'}
                    height={'50%'}
                    src={movieImg}
                    alt={'app'}
                />
        }
    ]

    console.log(typeof AppImage)

    const suggestionForRender = suggestions.map(el => {
        return (
            <SuggestionsItem to={el.to} title={el.title} img={el.img} description={el.description}/>
        )
    })

    return (
        <HStack
            max
            align={'center'}
            justify={'center'}
            wrap={"wrap"}
            gap={'32'}
            className={classNames(cls.Suggestions, {}, [className])}
        >
            {suggestionForRender}
        </HStack>
    );
});
