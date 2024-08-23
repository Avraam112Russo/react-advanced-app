import {SaveScrollSchema} from "./model/type/SaveScrollSchema"
import {getSaveScrollByPathSelector} from "./model/selector/getSaveScrollSelector"
import {scrollSaveReducer, scrollSaveActions} from "features/scrollSave/model/slice/SaveScrollSlice";

export {SaveScrollSchema, getSaveScrollByPathSelector, scrollSaveReducer, scrollSaveActions}
