import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Counter} from "enteties/Counter";
import {Input} from "shared/ui/Input/Input";

const MainPage = () => {
    const {t} = useTranslation('main')
    const [value, setValue] = useState<string>()
    return (
        <div>

            {t('Главная страница')}

            <Counter/>

            {value}
            <Input placeholder={"Type text"} value={value} onChange={(val: string) => setValue(val)}/>
        </div>
    );
};

export default MainPage;