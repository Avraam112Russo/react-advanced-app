import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ProfilePageHeader.module.scss"
import {Text} from "shared/ui/text/Text";
import {Button, ButtonTheme} from "shared/ui/button/Button";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {StateSchema} from "app/providers/storeProvider";
import {useCallback} from "react";
import {useAppDispatch} from "app/providers/storeProvider/config/store";
import {ProfileActions} from "entities/profile/model/slice/ProfileSlice";
import {UpdateProfileData} from "entities/profile/model/services/updateProfileData/UpdateProfileData";
export interface ProfilePageHeaderProps {
    className?: string;
}
export const ProfilePageHeader = ({className}:ProfilePageHeaderProps) => {
    const {t} = useTranslation();
    const read_only = useSelector((state: StateSchema) => state.profile?.readonly);
    const dispatch = useAppDispatch();

    // start edit profile
    const onEdit = useCallback(()=> {
        dispatch(ProfileActions.setReadOnly(false))
    }, [dispatch])

    const onSave = () => {
        dispatch(UpdateProfileData())
        dispatch(ProfileActions.setReadOnly(true))
    }
    // cancel edit profile
    const onCancelEdit = useCallback(()=> {
        dispatch(ProfileActions.cancelEdit())
    }, [dispatch])


    return (
        <div className={classNames(cls.ProfilePageHeader)}>
                <Text text={t('Профиль')}/>
            {read_only == true ? (
                <Button
                    onClick={onEdit}
                    className={classNames(cls.editBtn)}
                    buttonTheme={ButtonTheme.OUTLINE}>
                    {t('Редактировать')}
                </Button>
            ) :(
                <>
                <Button
                    onClick={onCancelEdit}
                    className={classNames(cls.editBtn)}
                    buttonTheme={ButtonTheme.OUTLINE_RED}>
                    {t("Отменить")}
                </Button>
                <Button
                onClick={onSave}
            className={classNames('')}
            buttonTheme={ButtonTheme.OUTLINE}>
            {t("Сохранить")}
                </Button>
                </>
            )}

        </div>
    );
};
