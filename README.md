# Redux Core

- Cài đặt dự án `yarn install`
- Chạy dự án `yarn start`

## Giới thiệu

> Redux là một thư viện Javascript để quản lý state toàn cục trong ứng dụng, đảm bảo state dễ dữ đoán, dễ bảo trì và dễ debug nhờ mô hình luồng dữ liệu một chiều (unidirectional data flow)
> 

### Hệ sinh thái

- Redux Core - Cung cấp các API cơ bản và sơ khai nhất, giúp người dùng hiểu rõ cơ chế hoạt động của Redux
- Redux Toolkit - Giúp Redux viết gọn hơn, dễ đọc hơn. Đây là bản Redux được khuyên dùng hiện nay
- Redux Thunk - Middleware giúp xử lý bất đồng bộ (async) đơn giản như gọi API. Redux Thunk cũng đã được tích hợp sẵn trong Redux Toolkit
- Redux Saga - Middleware nâng cao, dùng generator function để quản lý async phức tạp (retry, cancel, debounce, v.v.)

## Cài đặt thư viện

- Nếu dùng Javascript thuần `npm install redux redux-devtools-extension`
- Nếu dùng React.js `npm install redux redux-devtools-extension react-redux`

## Cách Redux hoạt động

![image.png](image.png)

1. Tạo một store, đây là kho lưu trữ state toàn cục của ứng dụng
    - Store được cấu thành từ reducer và là nguồn dữ liệu duy nhất trong Redux
2. Store có một root reducer duy nhất, và root reducer có thể được kết hợp từ nhiều slice reducer
    - Mỗi slice reducer quản lý một phần riêng của state (ví dụ: user, cart, product, v.v.), và chứa state khởi tạo + các action + logic cập nhật state
3. UI (component) lấy state từ store, hiển thị dữ liệu lên giao diện. Khi state trong store thay đổi, Redux tự động kiến UI re-render phần liên quan
4. Khi người dùng tương tác (click, nhập liệu, v.v.), logic trong event handler sẽ xác định cần cập nhật gì, và chuẩn bị dữ liệu (payload) cho hành động đó
5. Action là mô tả về việc muốn thay đổi state, thường có:
    - `type`: Tên hành động
    - `payload`: Dữ liệu kèm theo
    - Sau đó action được gửi (dispatch) đến store
    - Store chuyển action đó vào reducer tương ứng, reducer xử lý và trả về state mới

## Cách cấu hình

### Store

```js
import { createStore } from "redux";
import rootReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    rootReducer, /* rootReducer - Hàm xử lý logic cập nhật state (bắt buộc) */
    /* initValue - State ban đầu (nếu muốn khởi tạo state từ dữ liệu có sẵn, ví dụ từ localStorage hoặc server) */
    composeWithDevTools() /* enhancers - Dùng để mở rộng store (ví dụ thêm middleware, devtools, thunk, saga, v.v.) */
);

export default store;
```

### Root Reducer

```js
import { combineReducers } from "redux";

import filtersReducerSlice from "./reducer-slices/filters";
import todoListReducerSlice from "./reducer-slices/todo-list";

const rootReducer = combineReducers({
    filters: filtersReducerSlice,
    todoList: todoListReducerSlice
});

export default rootReducer;
```

### Slice Reducer

```js
const initState = [
    { id: 1, name: "Learn Yoga", completed: false, priority: "Medium" },
    { id: 2, name: "Learn Redux", completed: true, priority: "High" },
    { id: 3, name: "Learn Javascript", completed: false, priority: "Low" }
];

const todoListReducerSlice = (state = initState, action) => {
    switch (action.type) {
        case "todoList/addTodo": {
            return [
                ...state,
                action.payload
            ]
        }
        case "todoList/updateTodo": {
            const { id, completed } = action.payload;

            return state.map((todo) =>
                todo.id === id ? { ...todo, completed } : todo
            );
        }
        default: return state
    }
}

export default todoListReducerSlice;
```

## Lấy & Cập nhật state

### Lấy state

- Sử dụng hook `useSelector` lấy ra state mong muốn

```jsx
import { useSelector } from 'react-redux';

export default function Example() {
		const stateExample = useSelector(state => {
				// Logic . . .
				return state.stateExample;
		});
		
    return <></>
}
```

### Cập nhật state

- Sử dụng hook `useDispatch` gửi action cập nhật state

```jsx
import { useDispatch } from 'react-redux';

export default function Example() {
		const dispatch = useDispatch();
		
		const handleClick = () => {
				// Logic . . .
				
				const action = {
						type: "Name of action"
						payload: { . . . }
				}
				
				dispatch(action);
		}
		
		return <button onClick={handleClick}>Click Me</button>
}
```