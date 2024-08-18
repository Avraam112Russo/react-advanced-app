import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ProfileCard.module.scss"
import {Text, TextAlign, TextTheme} from "shared/ui/text/Text";
import {useTranslation} from "react-i18next";
import {Input} from "shared/ui/input/Input";
import {Profile} from "entities/profile";
import {Loader} from "shared/ui/loader/Loader";
import {Avatar} from "shared/ui/avatar/Avatar";
import {Select} from "shared/ui/select/Select";
import {MyCurrency} from "entities/currency/model/types/Currency";
import {CurrencySelect} from "entities/currency";

import {MyCountry} from "entities/country/model/types/Country";
import {CountrySelect} from "entities/country/ui/CountrySelect";

export interface ProfileCardProps {
     className?: string,
    data?: Profile,
    isLoading?:boolean,
    error?:string,
    readonly?:boolean,
    onChangeFirstName?:(value:string) => void,
    onChangeLastName?:(value:string) => void,
    onChangeCity?:(value:string) => void,
    onChangeAge?:(value:string) => void,
    onChangeUsername?:(value:string) => void,
    onChangeAvatar?:(value:string) => void,
    onChangeCurrency?:(value:MyCurrency) => void,
    onChangeCountry?:(value:MyCountry) => void,
 }
 export const ProfileCard = (props:ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        onChangeFirstName,
        onChangeLastName,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry,
        readonly} = props;
     const {t} = useTranslation('profile')
    if (isLoading == true){
        return (
            <div className={classNames(cls.ProfileCard, {[cls.loading]:true}, [className])}>
              <Loader/>
            </div>
        )
    }
    if (error){
        return (
            <div className={classNames(cls.ProfileCard, {[cls.error]:true}, [className])}>
              <Text
                  align={TextAlign.CENTER}
                  title={'Something went wrong...'}
                  text={'Please, try again...'}
                  theme={TextTheme.ERROR}/>
            </div>
        )
    }
     return (
         <div className={classNames(cls.ProfileCard)}>

             <div className={classNames(cls.data)}>
                 <div className={classNames(cls.avatarWrapper)}>
                     {data?.avatar && <Avatar src={data?.avatar} alt={""}/>}
                 </div>

                 <Input
                     readOnly={readonly}
                     onChange={onChangeFirstName}
                     className={cls.input}
                     value={data?.first}
                     placeholder={t('Ваше имя') + ': '}/>
                 <Input
                     readOnly={readonly}
                     onChange={onChangeLastName}
                     className={classNames(cls.input, {}, [className])}
                     value={data?.lastname}
                     placeholder={t('Ваша фамилия' + ': ')}/>
                 <Input
                     readOnly={readonly}
                     onChange={onChangeCity}
                     className={classNames(cls.input, {}, [className])}
                     value={data?.city}
                     placeholder={t('Ваш город' + ': ')}/>
                 <Input
                     readOnly={readonly}
                     onChange={onChangeAge}
                     className={classNames(cls.input, {}, [className])}
                     value={data?.age}
                     placeholder={t('Ваш возвраст' + ': ')}/>
                 <Input
                     readOnly={readonly}
                     onChange={onChangeUsername}
                     className={classNames(cls.input, {}, [className])}
                     value={data?.username}
                     placeholder={t('Ваш username' + ': ')}/>
                 <Input
                     readOnly={readonly}
                     onChange={onChangeAvatar}
                     className={classNames(cls.input, {}, [className])}
                     value={data?.avatar}
                     placeholder={t('Ваш avatar' + ': ')}/>

            <CurrencySelect
                readOnly={readonly}
                value={data?.currency} onChange={onChangeCurrency} />
                 <CountrySelect
                     readOnly={readonly}
                     value={data?.country} onChange={onChangeCountry} />
             </div>
         </div>
     );
 };
 