// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Cấu hình theo redux core
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

// import { createStore } from "redux";
// import rootReducer from "./reducer";
// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

// const store = createStore(
//     rootReducer, /* rootReducer - Hàm xử lý logic cập nhật state (bắt buộc) */
//     /* initValue - State ban đầu (nếu muốn khởi tạo state từ dữ liệu có sẵn, ví dụ từ localStorage hoặc server) */
//     composeWithDevTools() /* enhancers - Dùng để mở rộng store (ví dụ thêm middleware, devtools, thunk, saga, v.v.) */
// );

// export default store;




// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Cấu hình theo redux toolkit
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

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