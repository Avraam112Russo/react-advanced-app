import { configureStore } from '@reduxjs/toolkit'
import {StateSchema} from "app/providers/storeProvider/config/StateSchema";
import {counterReducer} from "entities/counter";


export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            counter: counterReducer
        },
        devTools: __IS_DEV__, // development tools work only in dev mode
        preloadedState: initialState
    })
}