import {classNames} from "shared/lib/classNames";
import cls from "./LoginForm.module.scss"
import {useTranslation} from "react-i18next";
import {Button} from "shared/ui/button/Button";
import {Input} from "shared/ui/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {loginActions} from "features/authByUsername/model/slice/LoginSlice";
import {memo, useCallback} from "react";
import {StateSchema} from "app/providers/storeProvider/config/StateSchema";
import {loginByUsername} from "features/authByUsername/services/loginByUsername/LoginByUsername";
import {Text, TextTheme} from "shared/ui/text/Text";

export interface LoginFormProps {
    className?: string;
}

// memo return saved value
export const LoginForm = memo(({className}:LoginFormProps) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();


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
    const userNameFromState = useSelector((state: StateSchema) => state.login.username);
    const passwordFromState = useSelector((state: StateSchema) => state.login.password);
    const isLoadingFromState = useSelector((state: StateSchema) => state.login.isLoading);
    const errorFromState = useSelector((state: StateSchema) => state.login.error);


    // send username and password to backend
    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({username: userNameFromState, password: passwordFromState}))
    },[dispatch, passwordFromState, userNameFromState])



    return (
        <div className={classNames(cls.LoginForm)}>
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
