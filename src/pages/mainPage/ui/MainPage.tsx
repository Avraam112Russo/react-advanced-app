import React from 'react';
import {useTranslation} from "react-i18next";
import {MockErrorButton} from "app/providers/errorBoundary";
import {Counter} from "entities/counter";

const MainPage = () => {
    const {t} = useTranslation('mainPage');// loading translate only mainPage.json chunk
    return (
        <div>
            <MockErrorButton/>
            <br/>
            <Counter/>
            {t('Главная')}
            {/*t('Key')*/}
        </div>
    );
};

export default MainPage;