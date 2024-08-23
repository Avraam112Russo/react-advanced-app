import {useCallback, useMemo, useState} from "react";

export interface UseHoverBind {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}
type isHoverResult = [boolean, UseHoverBind]

// we can track when user hover mouse on element
export const useHover = () => {
    const [ isHover, setIsHover ] = useState<boolean>(false)
    const onMouseEnter = useCallback(() => {
        setIsHover(true)
    }, [])
    const onMouseLeave = useCallback(() => {
        setIsHover(false)

    }, [])
    return useMemo(() => [isHover, {onMouseLeave, onMouseEnter}],
        [isHover,onMouseLeave, onMouseEnter])
}