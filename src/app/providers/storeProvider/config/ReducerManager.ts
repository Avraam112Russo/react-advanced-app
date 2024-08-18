
// create lazy reducers
// initialReducers - default static reducers
import {AnyAction, combineReducers, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {ReducerManager, State_Schema_Key, StateSchema} from "./StateSchema";




// FUNCTION FOR LAZY LOADING REDUCERS
export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager { // : ReducerManager interface in StateSchema.ts
    const reducers = { ...initialReducers }

    let combinedReducer = combineReducers(reducers) // create default static reducer


    // array for remove reducers
    // user get authentication and after we can remove this reducer
    // State_Schema_Key -> names of keys in StateSchema
    let keysToRemove: Array<State_Schema_Key> = []




    return {
        getReducerMap: () => reducers,



        // reducer lazy loading
        reduce: (state: StateSchema, action:AnyAction) => {


            // if we have some reducer for remove
            if (keysToRemove.length > 0) {
                state = { ...state }
                keysToRemove.forEach((key) => {
                    delete state[key] // delete reducer
                })
                keysToRemove = []
            }

            return combinedReducer(state, action)
        },


        // add new lazy reducer
        add: (key:State_Schema_Key, reducer:Reducer) => {
            if (!key || reducers[key]) {
                return
            }

            reducers[key] = reducer

            combinedReducer = combineReducers(reducers)
        },

        // add reducer in array for remove
        remove: (key:State_Schema_Key) => {
            if (!key || !reducers[key]) {
                return
            }

            delete reducers[key]

            keysToRemove.push(key)

            combinedReducer = combineReducers(reducers)
        }
    }
}

