import {classNames} from "shared/lib/classNames";
import cls from "./LoginForm.module.scss"
import {useTranslation} from "react-i18next";
import {Button} from "shared/ui/button/Button";
import {Input} from "shared/ui/input/Input";
export interface LoginFormProps {
    className?: string;
}
export const LoginForm = ({className}:LoginFormProps) => {
    const {t} = useTranslation();
    return (
        <div className={classNames(cls.LoginForm)}>
            <Input
                placeholder={"Enter username"}
                type="text"/>
            <Input
                placeholder={"Enter password"}
                type="text"/>
            <Button className={classNames(cls.loginButton)}>
                {t('Войти')}
            </Button>
        </div>
    );
};
