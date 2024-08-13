import React from 'react';
import {useTranslation} from "react-i18next";

const MainPage = () => {
    const {t} = useTranslation('mainPage');// loading translate only mainPage.json chunk
    return (
        <div>
            {t('Главная')}
            {/*t('Key')*/}
        </div>
    );
};

export default MainPage;