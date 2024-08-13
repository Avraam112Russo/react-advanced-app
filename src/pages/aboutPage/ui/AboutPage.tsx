import React from 'react';
import {useTranslation} from "react-i18next";

const AboutPage = () => {
    const {t} = useTranslation('aboutPage'); // loading translate only aboutPage.json chunk
    return (
        <div>
            {t('О сайте')}
        </div>
    );
};

export default AboutPage;