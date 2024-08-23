import React from 'react';
import {useTranslation} from "react-i18next";
import {Counter} from "entities/counter";
import {PageWrapper} from "widgets/pageWrapper/PageWrapper";
import {classNames} from "shared/lib/classNames/classNames";

const AboutPage = () => {
    const {t} = useTranslation('aboutPage'); // loading translate only aboutPage.json chunk
    return (
        //
        <PageWrapper className={classNames('', {}, [])}>
            {t('О сайте')}
            <div>
                <Counter/>
            </div>
        </PageWrapper>
    );
};

export default AboutPage;