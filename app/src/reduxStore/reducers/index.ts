import { errorReducer } from "./errorReducers";
import { pages } from "../slices";
import { combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const rootReducer = combineReducers({
  error: errorReducer,
  pages: pages.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
