import {Redux_Store_With_Manager, State_Schema_Key} from "app/providers/storeProvider/config/StateSchema";
import {Reducer} from "@reduxjs/toolkit";
import {FC, useEffect} from "react";
import {useDispatch, useStore} from "react-redux";
import {useAppDispatch} from "app/providers/storeProvider/config/store";


export type ReducersList = {
    [name in State_Schema_Key]?: Reducer;
}

type ReducersListEntry = [State_Schema_Key, Reducer]

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children,
        reducers,
        removeAfterUnmount,
    } = props;

    const store = useStore() as Redux_Store_With_Manager;
    const dispatch = useAppDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
            store.reducerManager.add(name as State_Schema_Key, reducer);


            // init state
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {

                    //remove reducer
                    store.reducerManager.remove(name as State_Schema_Key);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {children}
        </>
    );
};
