import {classNames} from "shared/lib/classNames/classNames";
import cls from "./LoginForm.module.scss"
import {useTranslation} from "react-i18next";
import {Button} from "shared/ui/button/Button";
import {Input} from "shared/ui/input/Input";
import { useSelector, useStore} from "react-redux";
import {loginActions, loginReducer} from "features/authByUsername/model/slice/LoginSlice";
import {memo, useCallback, useEffect} from "react";
import {Redux_Store_With_Manager, StateSchema} from "app/providers/storeProvider/config/StateSchema";
import {loginByUsername} from "features/authByUsername/model/services/loginByUsername/LoginByUsername";
import {Text, TextTheme} from "shared/ui/text/Text";
import {useAppDispatch} from "app/providers/storeProvider/config/store";

export interface LoginFormProps {
    className?: string,
    onSuccess?:()=> void;
}

// memo return saved value
const LoginForm = memo(({className, onSuccess}:LoginFormProps) => {
    const {t} = useTranslation();



    // type AppDispatch from store.ts
    const dispatch = useAppDispatch();




    // get state store
    const store = useStore() as Redux_Store_With_Manager

    // when user call <LoginForm/>, we lazy load LoginReducer
    useEffect(() => {
        store.reducerManager.add('login', loginReducer) // loading reducer
        dispatch({type: "@INIT successfully Login form reducer"})// just for testing, show in redux devtools in browser
        return () => {
            store.reducerManager.remove('login') // add reducer for array remove
            dispatch({type: "@DESTROY successfully Login form reducer"})// just for testing, show in redux devtools in browser

        }
    }, []);





    // useCallback return one link (onChangeUserName) while don't change dependencies array (dispatch)
    // set action in redux store
    const onChangeUserName = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch])


    // set action in redux store
    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch])


    // retrieve data from redux store
    const userNameFromState = useSelector((state: StateSchema) => state?.login?.username);
    const passwordFromState = useSelector((state: StateSchema) => state?.login?.password);
    const isLoadingFromState = useSelector((state: StateSchema) => state?.login?.isLoading);
    const errorFromState = useSelector((state: StateSchema) => state?.login?.error);


    // send username and password to backend
    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({username: userNameFromState, password: passwordFromState}))

        // if success login close modal window
        if (result.meta.requestStatus === 'fulfilled'){
            onSuccess();
        }
    },[dispatch, passwordFromState, userNameFromState, onSuccess])



    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            {errorFromState && <Text text={errorFromState} theme={TextTheme.ERROR}/>}
            <Text  text={t('Форма авторизации')}/>
            <Input
                onChange={onChangeUserName}
                placeholder={"Enter username"}
                type="text"
                value={userNameFromState}
            />
            <Input
                onChange={onChangePassword}
                placeholder={"Enter password"}
                type="text"
                value={passwordFromState}
            />
            <Button
                disabled={isLoadingFromState} // disable button when user send request to api and data is loading
                onClick={onLoginClick}
                className={classNames(cls.loginButton)}>
                {t('Войти')}
            </Button>
        </div>
    );
});
export default LoginForm;
