import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './MovieAbout.module.scss'
import {memo} from "react";
import {useTranslation} from "react-i18next";
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {Text} from "@/shared/ui/redesigned/Text";

interface MovieAboutProps {
    className?: string;
    data?: MovieDtoV13;
}


export const MovieAbout = memo((props: MovieAboutProps) => {
    const {className, data} = props
    const {t} = useTranslation('movies')

    const countries = data?.countries?.map(el => el.name).join(', ')
    const genres = data?.genres?.map(el => el.name).join(', ')
    const directors = data?.persons?.filter(
        el => el.profession === "режиссеры").map((el) => el.enName).slice(0, 3).join(', ')
    const operators = data?.persons?.filter(
        el => el.profession === "операторы").map((el) => el.enName).slice(0, 3).join(', ')
    const artists = data?.persons?.filter(
        el => el.profession === "художники").map((el) => el.enName).slice(0, 3).join(', ')
    const producers = data?.persons?.filter(
        el => el.profession === "продюсеры").map((el) => el.enName).slice(0, 3).join(', ')
    const editors = data?.persons?.filter(
        el => el.profession === "монтажеры").map((el) => el.enName).slice(0, 3).join(', ')
    const screenwriter = data?.persons?.filter(
        el => el.profession === "редакторы").map((el) => el.enName).slice(0, 3).join(', ')
    const composer = data?.persons?.filter(
        el => el.profession === "композиторы").map((el) => el.enName).slice(0, 3).join(', ')


    // todo Создать универсальный компонент для полей
    return (
        <VStack align={'start'} justify={'start'} className={classNames(cls.MovieAbout, {}, [className])}>
            <Text bold title={t("О фильме")} size={"m"}/>
            {data?.year &&
                <HStack align={'center'} className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Год производства")}
                    </span>
                    <span className={cls.fieldDescription}>
                        {data?.year}
                    </span>
                </HStack>
            }
            {data?.countries
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Страна")}
                    </span>
                    <span className={cls.fieldDescription}>
                         {countries}
                    </span>
                </HStack>
            }
            {data?.genres
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Жанр")}
                    </span>
                    <span className={cls.fieldDescription}>
                         {genres}
                    </span>
                </HStack>
            }
            {data?.slogan
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Слоган")}
                    </span>
                    <span className={cls.fieldDescription}>
                         {data?.slogan}
                    </span>
                </HStack>
            }
            {directors
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Режиссера")}
                    </span>
                    <span className={cls.fieldDescription}>
                         {directors}
                    </span>
                </HStack>
            }
            {screenwriter
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Сценарий")}
                    </span>
                    <span className={cls.fieldDescription}>
                         {screenwriter}
                    </span>
                </HStack>
            }
            {producers
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Продюсер")}
                    </span>
                    <span className={cls.fieldDescription}>
                         {producers}
                    </span>
                </HStack>
            }
            {operators
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Оператор")}
                    </span>
                    <span className={cls.fieldDescription}>
                         {operators}
                    </span>
                </HStack>
            }
            {composer
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Композитор")}
                    </span>
                    <span className={cls.fieldDescription}>
                          {composer}
                    </span>
                </HStack>
            }
            {artists
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Художник")}
                    </span>
                    <span className={cls.fieldDescription}>
                          {artists}
                    </span>
                </HStack>
            }
            {editors
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Монтаж")}
                    </span>
                    <span className={cls.fieldDescription}>
                          {editors}
                    </span>
                </HStack>
            }
            {data?.budget?.value
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Бюджет")}
                    </span>
                    <span className={cls.fieldDescription}>
                        {(data?.budget?.currency || "$") + data?.budget?.value}
                    </span>
                </HStack>
            }
            {data?.fees?.usa?.value
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Сборы в США")}
                    </span>
                    <span className={cls.fieldDescription}>
                        {(data?.fees?.usa?.currency || "$") + data?.fees?.usa?.value}
                    </span>
                </HStack>
            }
            {data?.fees?.world?.value
                &&
                <HStack className={cls.field}>
                    <span className={cls.fieldName}>
                        {t("Сборы в мире")}
                    </span>
                    <span className={cls.fieldDescription}>
                        {(data?.fees?.world?.currency || "$") + data?.fees?.world?.value}
                    </span>
                </HStack>
            }
        </VStack>
    );
});
