import {useCallback, useRef} from "react";

export function useThrottle(callback: (...args:any[]) => void, delay:number) {
    const throttleRef = useRef(false)

    // call function only after some delay
    return useCallback((...args:any[]) => {
        if (!throttleRef.current){
            callback(...args);
            throttleRef.current = true
        }
        setTimeout(() => {
            throttleRef.current = false;
        }, delay)
    }, [callback, delay])
}