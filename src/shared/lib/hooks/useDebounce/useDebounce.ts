import {MutableRefObject, useCallback, useRef} from "react";

export function useDebounce(callback: (...args:any[]) => void, delay:number) {
    const timer = useRef() as MutableRefObject<any>

    // call function only after some delay
    // запрос на бекэнд идет не сразу после ввода какого то символа в строку поиска,
    // а через 500ms что бы не перегружать сервер
    // иначе при введение 10 символов будет 10 запросов
    return useCallback((...args:any[]) => {

            if (timer.current){
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
            callback(...args);
            }, delay)


    }, [callback, delay])
}