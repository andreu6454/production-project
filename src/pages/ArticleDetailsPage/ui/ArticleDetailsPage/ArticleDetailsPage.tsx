import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {ArticleDetails} from "entities/Article";
import {useParams} from "react-router-dom";
import {Text, TextTheme} from "shared/ui/Text/Text";

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = ({className}: ArticleDetailsPageProps) => {
    const {t} = useTranslation('article-details')

    const {id} = useParams<{ id: string }>()

    if(!id){
        return (
            <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
                <Text theme={TextTheme.ERROR} title={"Ошибка"} text={t("Статья не найдена")}/>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
            <ArticleDetails id={id}/>
        </div>
    );
};

export default memo(ArticleDetailsPage);