import {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Counter} from "@/entities/Counter";
import {Input} from "@/shared/ui/Input/Input";
import {Page} from "@/widgets/Page/Page";
import {RatingCard} from "@/entities/Rating";

const MainPage = () => {
    const {t} = useTranslation('main')
    const [value, setValue] = useState<string>()
    return (
        <Page>

            {t('Главная страница')}

            <Counter/>

            {value}
            <Input placeholder={"Type text"} value={value} onChange={(val: string) => setValue(val)}/>


            <RatingCard
                title={'Ваш фитбек'}
                feedbackTitle={'Оставьте отзыв о статье '}
                hasFeedback={true}
            />
        </Page>
    );
};

export default MainPage;