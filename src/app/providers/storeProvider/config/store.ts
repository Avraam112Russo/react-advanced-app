import {configureStore, ReducersMapObject} from '@reduxjs/toolkit'
import {StateSchema, ThunkExtraArg} from "app/providers/storeProvider/config/StateSchema";
import {counterReducer} from "entities/counter";
import {userReducer} from "entities/user";
import { CombinedState, Reducer } from 'redux';
import {createReducerManager} from "app/providers/storeProvider/config/ReducerManager";
import {useDispatch} from "react-redux";
import {$API} from "shared/api/Api";
import {useNavigate} from 'react-router-dom'
import {NavigateFunction, NavigateOptions} from "react-router";
import {To} from 'history'
import {AxiosInstance} from "axios";
import {scrollSaveReducer} from "features/scrollSave";

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema> ) {




        // add default static reducers
        const rootReducers:ReducersMapObject<StateSchema> =
            {
                ...asyncReducers,
                counter: counterReducer,
                user: userReducer,
                saveScroll: scrollSaveReducer
            }
        const reducerManager = createReducerManager(rootReducers);
        const extraArg: ThunkExtraArg = {
        api: $API
    };

    const store =
        configureStore({

        // static default and lazy reducers
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,


        devTools: __IS_DEV__, // development tools work only in dev mode
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({

            // get our axios api here, and we don't need import axios in each component
            thunk:{
                extraArgument:extraArg
            }
        })
    });
    //@ts-ignore
    store.reducerManager = reducerManager

    return store;
}

//create type for dispatch
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'] // fetch dispatch type
export const useAppDispatch = () => useDispatch<AppDispatch>()

