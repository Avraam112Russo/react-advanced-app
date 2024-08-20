import {classNames} from "shared/lib/classNames/classNames";
import cls from "./AddNewCommentForm.module.scss"
import {Input} from "shared/ui/input/Input";
import {Button, ButtonTheme} from "shared/ui/button/Button";
import {useTranslation} from "react-i18next";
import { useSelector} from "react-redux";
import {Get_AddNewCommentTextSelector} from "features/addNewComment/model/selectors/AddNewCommentSelector";
import {useCallback} from "react";
import {useAppDispatch} from "app/providers/storeProvider/config/store";
import {AddNewCommentAction, AddNewCommentReducer} from "features/addNewComment/model/slice/AddNewCommentSlice";
import {DynamicModuleLoader, ReducersList} from "shared/lib/dynamicModuleLoader/DynamicModuleLoader";

export interface AddNewCommentFormProps {
    className?: string,
    onSendCommentToApi:(text:string) => void;
}
const reducers: ReducersList = {
    addNewComment: AddNewCommentReducer
}
const AddNewCommentForm = ({className, onSendCommentToApi}:AddNewCommentFormProps) => {
    const {t} = useTranslation();


    const dispatch = useAppDispatch();
    const text_from_state = useSelector(Get_AddNewCommentTextSelector)


    // set text in state
    const onChangeTextComment = useCallback((value:string) => {
        dispatch(AddNewCommentAction.setTextComment(value))
    }, [dispatch])

    const onSendHandler = useCallback(() => {
        onSendCommentToApi(text_from_state || '') // send data to api
        onChangeTextComment('') // clear input
    }, [onChangeTextComment, onSendCommentToApi, text_from_state])




    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>

        <div className={classNames(cls.AddNewCommentForm)}>
            <Input
                className={cls.input}
                value={text_from_state}
                onChange={onChangeTextComment}/>
            <Button
                onClick={onSendHandler}
                buttonTheme={ButtonTheme.OUTLINE}>{t('Отправить')}</Button>
        </div>
        </DynamicModuleLoader>
    );
};

export default AddNewCommentForm;