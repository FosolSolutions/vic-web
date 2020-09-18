import { errorReducer } from "./errorReducers";
import { combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const rootReducer = combineReducers({
  error: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
