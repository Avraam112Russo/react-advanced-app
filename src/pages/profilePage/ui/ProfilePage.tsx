import {useTranslation} from "react-i18next";
import {useCallback, useEffect} from "react";
import {useSelector, useStore} from "react-redux";
import {Redux_Store_With_Manager, StateSchema} from "app/providers/storeProvider";
import {useAppDispatch} from "app/providers/storeProvider/config/store";
import {ProfileActions, ProfileReducer} from "entities/profile/model/slice/ProfileSlice";
import {DynamicModuleLoader, ReducersList} from "shared/lib/dynamicModuleLoader/DynamicModuleLoader";
import {FetchProfileData} from "entities/profile/model/services/fetchProfileData/FetchProfileData";
import {ProfileCard} from "entities/profile";
import {GetProfileError} from "entities/profile/model/selectors/getProfileError/getProfileError";
import {GetProfileIsLoading} from "entities/profile/model/selectors/getProfileIsLoading/getProfileIsLoading";
import {ProfilePageHeader} from "pages/profilePage/ui/profilePageHeader/ProfilePageHeader";
import {MyCurrency} from "entities/currency/model/types/Currency";


import {MyCountry} from "entities/country/model/types/Country";
import {getValidateError} from "entities/profile/model/selectors/getValidateError/getValidateError";
import {Text, TextTheme} from "shared/ui/text/Text";
import {useParams} from "react-router-dom";

export interface ProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    profile: ProfileReducer,
};

 const ProfilePage = ({className}:ProfilePageProps) => {
    const {t} = useTranslation();

     const data_and_form = useSelector((state: StateSchema) => state?.profile?.form)
     console.log(data_and_form);

     const error = useSelector(GetProfileError)
     const isLoading = useSelector(GetProfileIsLoading)
    const readOnly = useSelector((state: StateSchema) => state?.profile?.readonly)
    const validateErrors = useSelector(getValidateError)
     const store = useStore() as Redux_Store_With_Manager
    const {id} = useParams<{id: string}>(); // get id from url





     // useEffect(() => {
     //     store.reducerManager.add('profile', ProfileReducer) // loading reducer
     //     dispatch({type: "@INIT PROFILE form reducer"})// just for testing, show in redux devtools in browser
     //     return () => {
     //         store.reducerManager.remove('profile') // add reducer for array remove
     //         dispatch({type: "@DESTROY PROFILE reducer"})// just for testing, show in redux devtools in browser
     //
     //     }
     // }, []);





    const dispatch = useAppDispatch();
     useEffect(() => {
         if(id){
         dispatch(FetchProfileData(id))
         }
     }, [dispatch]);


     // update data usage actions
     const onChangeFirstName = useCallback((value?:string)=> {
        dispatch(ProfileActions.updateProfile({first: value || '' }))
      }, [dispatch])
     const onChangeLastName = useCallback((value?:string)=> {
        dispatch(ProfileActions.updateProfile({lastname: value || '' }))
     }, [dispatch])
     const onChangeAge = useCallback((value?:string)=> {
         dispatch(ProfileActions.updateProfile({age: Number( value || 0) }))
     }, [dispatch])
     const onChangeCity = useCallback((value?:string)=> {
         dispatch(ProfileActions.updateProfile({city: value || '' }))
     }, [dispatch])
     const onChangeAvatar = useCallback((value?:string)=> {
         dispatch(ProfileActions.updateProfile({avatar: value || '' }))
     }, [dispatch])

     const onChangeUsername = useCallback((value?:string)=> {
         dispatch(ProfileActions.updateProfile({username: value || '' }))
     }, [dispatch])
     const onChangeCurrency = useCallback((value?:MyCurrency)=> {
         dispatch(ProfileActions.updateProfile({currency: value || '' }));
     }, [dispatch])
     const onChangeCountry = useCallback((value?:MyCountry)=> {
         dispatch(ProfileActions.updateProfile({country: value || '' }))
     }, [dispatch])




     return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>

            {/*if we have some error*/}
            <div>
                {validateErrors?.length > 0 && validateErrors.map((error) => (
                    <Text
                        key={error}
                        text={error} theme={TextTheme.ERROR}/>
                ))}
            <ProfilePageHeader/>
            <ProfileCard
                onChangeCountry={onChangeCountry}
                onChangeCurrency={onChangeCurrency}
                onChangeAge={onChangeAge}
                onChangeCity={onChangeCity}
                readonly={readOnly}
                onChangeFirstName={onChangeFirstName}
                onChangeLastName={onChangeLastName}
                onChangeAvatar={onChangeAvatar}
                onChangeUsername={onChangeUsername}
            isLoading={isLoading}
            error={error}
            data={data_and_form}/>
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
