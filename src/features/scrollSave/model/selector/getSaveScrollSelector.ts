import {StateSchema} from "app/providers/storeProvider";
import {createSelector} from "@reduxjs/toolkit";

export const getSaveScrollSelector = (state:StateSchema) => state?.saveScroll?.scroll

export const getSaveScrollByPathSelector = createSelector(
    getSaveScrollSelector,
    (state:StateSchema, path:string) => path,
    (scroll, path) => scroll[path] || 0
)