import {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Counter} from "@/entities/Counter";
import {Input} from "@/shared/ui/Input/Input";
import {Page} from "@/widgets/Page/Page";

const MainPage = () => {
    const {t} = useTranslation('main')
    const [value, setValue] = useState<string>()
    return (
        <Page>

            {t('Главная страница')}

            <Counter/>

            {value}
            <Input placeholder={"Type text"} value={value} onChange={(val: string) => setValue(val)}/>
        </Page>
    );
};

export default MainPage;