import React from 'react';
import {useTranslation} from "react-i18next";
import {Counter} from "entities/counter";

const AboutPage = () => {
    const {t} = useTranslation('aboutPage'); // loading translate only aboutPage.json chunk
    return (
        //
        <div>
            {t('О сайте')}
            <div>
                <Counter/>
            </div>
        </div>
    );
};

export default AboutPage;