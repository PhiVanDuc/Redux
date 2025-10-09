# Redux Toolkit

- Cài đặt dự án `yarn install`
- Chạy dự án `yarn start`

## Cài đặt thư viện

- Nếu dùng Javascript thuần `npm install redux @reduxjs/toolkit`
- Nếu dùng React.js `npm install redux @reduxjs/toolkit react-redux`

## Cách cấu hình

### Store

```js
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

### Slice Reducer

```js
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

## Cập nhật state

- Sử dụng hook `useDispatch` gửi action cập nhật state

```jsx
import { useDispatch } from 'react-redux';
import todoListReducerSlice from "../../store/reducer-slices/todo-list";

export default function Example() {
		const dispatch = useDispatch();
		
		const handleClick = () => {
				// Logic . . .
				dispatch(
						todoListReducerSlice.actions.addTodo(/* payload */)
				);
		}
		
		return <button onClick={handleClick}>Click Me</button>
}
```