import {classNames} from "shared/lib/classNames/classNames";
import cls from "./CommentList.module.scss"
import {CommentCard} from "entities/comment/ui/commentCard/CommentCard";
import {Text} from "shared/ui/text/Text";
import {useTranslation} from "react-i18next";
import {Comment} from "entities/comment";
export interface CommentListProps {
    className?: string,
    listOfComments?:Comment[],
    isLoading?:boolean
}
export const CommentList = ({className, listOfComments, isLoading}:CommentListProps) => {
    const {t} = useTranslation();
    return (
        <div className={classNames(cls.CommentList)}>
            {listOfComments?.length > 0 ? listOfComments.map(comment => (
                <CommentCard
                    isLoading={isLoading}
                    className={cls.commentCard}
                    comment={comment}/>
            ))
            :
                <Text text={t('Комментарии отсутствуют')}/>
            }
        </div>
    );
};
