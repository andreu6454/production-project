import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './MovieAbout.module.scss'
import {memo} from "react";
import {useTranslation} from "react-i18next";
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {VStack} from "@/shared/ui/redesigned/Stack";
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
        el => el.profession === "режиссеры").map((el) => el.enName).slice(0,3).join(', ')
    const operators = data?.persons?.filter(
        el => el.profession === "операторы").map((el) => el.enName).slice(0,3).join(', ')
    const artists = data?.persons?.filter(
        el => el.profession === "художники").map((el) => el.enName).slice(0,3).join(', ')
    const producers = data?.persons?.filter(
        el => el.profession === "продюсеры").map((el) => el.enName).slice(0,3).join(', ')
    const editors = data?.persons?.filter(
        el => el.profession === "монтажеры").map((el) => el.enName).slice(0,3).join(', ')
    const screenwriter = data?.persons?.filter(
        el => el.profession === "редакторы").map((el) => el.enName).slice(0,3).join(', ')
    const composer = data?.persons?.filter(
        el => el.profession === "композиторы").map((el) => el.enName).slice(0,3).join(', ')

    console.log(data?.persons)

    return (
        <VStack align={'start'} justify={'start'} className={classNames(cls.MovieAbout, {}, [className])}>
            <Text bold title={t("О фильме")} size={"m"}/>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Год производства")}
                </span>
                {data?.year}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Страна")}
                </span>
                {countries}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Жанр")}
                </span>
                {genres}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Слоган")}
                </span>
                {data?.slogan}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Режиссера")}
                </span>
                {directors}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Сценарий")}
                </span>
                {screenwriter}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Продюсер")}
                </span>
                {producers}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                   {t("Оператор")}
                </span>
                {operators}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Композитор")}
                </span>
                {composer}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Художник")}
                </span>
                {artists}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Монтаж")}
                </span>
                {editors}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Бюджет")}
                </span>
                {data?.budget?.value + (data?.budget?.currency || "$")}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Сборы в США")}
                </span>
                {(data?.fees?.usa?.currency || "$") + data?.fees?.usa?.value}
            </span>
            <span className={cls.field}>
                <span className={cls.fieldName}>
                    {t("Сборы в мире")}
                </span>
                {(data?.fees?.world?.currency || "$") + data?.fees?.world?.value}
            </span>
        </VStack>
    );
});
