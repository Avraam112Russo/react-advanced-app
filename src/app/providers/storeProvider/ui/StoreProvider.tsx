import {classNames} from "shared/lib/classNames";
import {ReactNode} from "react";
import {Provider} from "react-redux";
import {createReduxStore} from "app/providers/storeProvider/config/store";
import {StateSchema} from "app/providers/storeProvider/config/StateSchema";
export interface StoreProviderProps {
    children?: ReactNode,
    initialState?:StateSchema
}

// we need provider for connect react and redux
export const StoreProvider = ({children, initialState}:StoreProviderProps) => {


    const reduxStore = createReduxStore(initialState);
    return (
        <Provider store={reduxStore}>
            {children}
        </Provider>
    );
};
