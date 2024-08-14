import React from 'react';
import {useTranslation} from "react-i18next";
import {MockErrorButton} from "app/providers/errorBoundary";

const MainPage = () => {
    const {t} = useTranslation('mainPage');// loading translate only mainPage.json chunk
    return (
        <div>
            <MockErrorButton/>
            {t('Главная')}
            {/*t('Key')*/}
        </div>
    );
};

export default MainPage;