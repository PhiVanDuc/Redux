import { configureStore } from "@reduxjs/toolkit";

import filtersReducerSlice from "./reducer-slices/filters";
import todoListReducerSlice from "./reducer-slices/todo-list";

const store = configureStore(
    {
        reducer: {
            filters: filtersReducerSlice.reducer,
            todoList: todoListReducerSlice.reducer
        }
    }
);

export default store;