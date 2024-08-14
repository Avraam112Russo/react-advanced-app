import {classNames} from "shared/lib/classNames";
import {useEffect, useState} from "react";
import {Button} from "shared/ui/button/Button";
export interface MockErrorProps {
    className?: string;
}

// throw mock error when press button and errorBoundary handle this
export const MockErrorButton = ({className}:MockErrorProps) => {
    const [error, setError] = useState(false);
    const onThrowError = () =>{
        setError(true)
    }
    useEffect(() => {
        if (error == true){
        throw new Error("throw mock error")
        }
    }, [error]);

    return (
        <Button
            onClick={onThrowError}
            className={classNames('')}>
        BUG_ERROR
        </Button>
    );
};
