import React from 'react';
import {useTranslation} from "react-i18next";
import {MockErrorButton} from "app/providers/errorBoundary";
import {Counter} from "entities/counter";
import {Input} from "shared/ui/input/Input";
import {PageWrapper} from "widgets/pageWrapper/PageWrapper";
import {classNames} from "shared/lib/classNames/classNames";

const MainPage = () => {
    const {t} = useTranslation('mainPage');// loading translate only mainPage.json chunk
    const [value, setValue] = React.useState('');
    const onChangeValue = (value: string) => {
        setValue(value);
    }
    return (
        <PageWrapper className={classNames('', {}, [])}>
            <MockErrorButton/>
            <br/>
            <Counter/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Input
                placeholder={"Enter text: "}
                value={value}
                onChange={onChangeValue}/>
            {t('Главная')}
            {/*t('Key')*/}
        </PageWrapper>
    );
};
// lazy components work only with default import
export default MainPage;