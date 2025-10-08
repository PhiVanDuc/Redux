import { combineReducers } from "redux";

import filtersReducerSlice from "./reducer-slices/filters";
import todoListReducerSlice from "./reducer-slices/todo-list";

const rootReducer = combineReducers({
    filters: filtersReducerSlice,
    todoList: todoListReducerSlice
});

export default rootReducer;