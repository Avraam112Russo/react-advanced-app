import {classNames} from "shared/lib/classNames/classNames";
import cls from "./CommentCard.module.scss"
import {Comment} from "entities/comment";
import {Avatar} from "shared/ui/avatar/Avatar";
import {Text} from "shared/ui/text/Text";
import {Skeleton} from "shared/ui/skeleton/Skeleton";
import {AppLink} from "shared/ui/appLink/AppLink";
import {routeConfig, RoutePath} from "app/providers/router/routeConfig/RouteConfig";
export interface CommentCardProps {
    className?: string,
    comment:Comment,
    isLoading?:boolean
}
export const CommentCard = ({className, comment, isLoading }:CommentCardProps) => {


    if (isLoading === true){

        return (
            <div className={classNames(cls.CommentCard, {}, [className])}>
                <div className={cls.headerCard}>
                 <Skeleton border={"50%"} width={30} height={30}/>{/*avatar*/}
                 <Skeleton height={16} width={100} className={cls.username}/> {/*username*/}
                </div>
                 <Skeleton className={cls.text} width={'100%'} height={50}/> {/*comment text*/}
            </div>
        )


    }
    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>



            <AppLink to={`${RoutePath.profile}` + `${comment.user.id}`}>{/*click to the comment and redirect to user profile /profile/1 */}
                <div className={cls.headerCard}>
                    {comment.user.avatar ? <Avatar src={comment.user.avatar} size={30}/> : null}
                    <Text className={cls.username} title={comment.user.username}/>
                </div>
            </AppLink>

            <Text text={comment.text} className={cls.text}/>

        </div>
    );
};
