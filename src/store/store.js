import { createStore } from "redux";
import rootReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    rootReducer, /* rootReducer - Hàm xử lý logic cập nhật state (bắt buộc) */
    /* initValue - State ban đầu (nếu muốn khởi tạo state từ dữ liệu có sẵn, ví dụ từ localStorage hoặc server) */
    composeWithDevTools() /* enhancers - Dùng để mở rộng store (ví dụ thêm middleware, devtools, thunk, saga, v.v.) */
);

export default store;