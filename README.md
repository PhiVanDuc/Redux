# Redux Toolkit

- Cài đặt dự án `yarn install`
- Chạy dự án `yarn start`

## Cách cài đặt

- Nếu dùng Javascript thuần `npm install redux @reduxjs/toolkit`
- Nếu dùng React.js `npm install redux @reduxjs/toolkit react-redux`

## Cấu hình

### Reducer

- Có thể trực tiếp cấu hình reducer trong file `store.js` hoặc tách ra file khác

```jsx
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
```

### Cấu hình slice reducer

- Làm mẫu với file todo-list.js
- Thuộc tính name kết hợp với tên phương thức như addTodo sẽ tạo ra type cho action `todoList/addTodo` `todoList/updateTodo`

```
import { createSlice } from "@reduxjs/toolkit";

const todoListReducerSlice = createSlice(
    {
        name: "todoList",
        initialState: [
            { id: 1, name: "Learn Yoga", completed: false, priority: "Medium" },
            { id: 2, name: "Learn Redux", completed: true, priority: "High" },
            { id: 3, name: "Learn Javascript", completed: false, priority: "Low" }
        ],
        reducers: {
            addTodo: (state, action) => {
                state.push(action.payload);
            },
            updateTodo: (state, action) => {
                const { id, completed } = action.payload;

                const todo = state.find(todo => todo.id === id);
                if (todo) todo.completed = completed;
            }
        }
    }
);

export default todoListReducerSlice;
```

### Cập nhật state

```jsx
import { useDispatch } from 'react-redux';
import todoListReducerSlice from "../../store/reducer-slices/todo-list";

export default function Example() {
		const dispatch = useDispatch();
		
		const handleClick = () => {
				dispatch(
						todoListReducerSlice.actions.addTodo(/* payload */)
				);
		}
		
		return <button onClick={handleClick}></button>
}
```