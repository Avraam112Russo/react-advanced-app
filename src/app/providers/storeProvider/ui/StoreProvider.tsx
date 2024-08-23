import {classNames} from "shared/lib/classNames/classNames";
import {ReactNode} from "react";
import {Provider} from "react-redux";
import {createReduxStore} from "app/providers/storeProvider/config/store";
import {StateSchema} from "app/providers/storeProvider/config/StateSchema";
import {useNavigate} from "react-router-dom";
import {DeepPartial, ReducersMapObject} from "@reduxjs/toolkit";
export interface StoreProviderProps {
    children?: ReactNode,
    initialState?:DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

// we need provider for connect react and redux
export const StoreProvider = ({children, initialState, asyncReducers}:StoreProviderProps) => {
    // const navigate = useNavigate();

    const reduxStore =
        createReduxStore(
            initialState as StateSchema,
            asyncReducers as ReducersMapObject<StateSchema>,
            // navigate
        );
    console.log("render");
    return (
        <Provider store={reduxStore}>
            {children}
        </Provider>
    );
};
