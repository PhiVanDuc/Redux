# Redux

> Redux là một thư viện Javascript để quản lý state toàn cục trong ứng dụng, đảm bảo state dễ dữ đoán, dễ bảo trì và dễ debug nhờ mô hình luồng dữ liệu một chiều (unidirectional data flow)
> 
- Hệ sinh thái của Redux
    - Redux Core - Cung cấp các API cơ bản và sơ khai nhất, giúp người dùng hiểu rõ cơ chế hoạt động của Redux
    - Redux Toolkit - Giúp Redux viết gọn hơn, dễ đọc hơn. Đây là bản Redux được khuyên dùng hiện nay
    - Redux Thunk - Middleware giúp xử lý bất đồng bộ (async) đơn giản như gọi API. Redux Thunk cũng đã được tích hợp sẵn trong Redux Toolkit
    - Redux Saga - Middleware nâng cao, dùng generator function để quản lý async phức tạp (retry, cancel, debounce, v.v.)

## Redux Core

- Cài đặt
    - Nếu dùng Javascript thuần `npm install redux`
    - Nếu dùng React.js `npm install redux react-redux`
- Cách hoạt động
    
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
- Cấu hình
    - Tạo folder tên `store`
    - Tạo file tên `store.js` - Cấu hình kho lưu trữ state
    
    ```
    // store.js
    
    import { createStore } from "redux";
    import rootReducer from "./reducer";
    import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
    
    const store = createStore(
        rootReducer, /* rootReducer - Hàm xử lý logic cập nhật state (bắt buộc) */
        /* initValue - State ban đầu (nếu muốn khởi tạo state từ dữ liệu có sẵn, ví dụ từ localStorage hoặc server) */
        composeWithDevTools() /* enhancers - Dùng để mở rộng store (ví dụ thêm middleware, devtools, thunk, saga, v.v.) */
    );
    
    export default store;
    ```
    
    - Tạo file tên `rootReducer.js` - Cấu hình hàm xử lý logic cập nhật state - Đoạn code bên dưới sẽ dùng các slice reducer và hàm `combineReducers` để gộp các slice reducer lại
    
    ```
    // rootReducer.js
    
    import { combineReducers } from "redux";
    
    import filtersReducerSlice from "./reducer-slices/filters";
    import todoListReducerSlice from "./reducer-slices/todo-list";
    
    const rootReducer = combineReducers({
        filters: filtersReducerSlice,
        todoList: todoListReducerSlice
    });
    
    export default rootReducer;
    ```
    
    - Tạo folder `reducer-slices`
    - Tạo file `filters.js` - Cấu hình slice reducer và làm tương tự với các slice reducer khác
    
    ```
    // filters.js
    
    const initState = {
        search: "",
        status: "All"
    };
    
    const filtersReducerSlice = (state = initState, action) => {
        switch (action.type) {
            case "todoList/searchText": {
                return {
                    ...state,
                    search: action.payload
                }
            }
            case "todoList/searchStatus": {
                return {
                    ...state,
                    status: action.payload
                }
            }
            default: return state
        }
    }
    
    export default filtersReducerSlice;
    ```
    
- Cách lấy state, gửi action để cập nhật state
    - Sử dụng hook `useSelector` để truy cập vào global state và lấy ra state mong muốn
    
    ```
    import { useSelector } from 'react-redux';
    
    export default function Example() {
    		const stateExample = useSelector(state => {
    				return state.stateExample;
    		});
    		
        return <></>
    }
    ```
    
    - Sử dụng hook `useDispatch` để gửi action đến store và store gửi action đến reducer
    
    ```
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
    		
    		return <button onClick={handleClick}></button>
    }
    ```
    

## Redux Toolkit

- Cài đặt
    - Nếu dùng Javascript thuần `npm install redux @reduxjs/toolkit`
    - Nếu dùng React.js `npm install redux @reduxjs/toolkit react-redux`
- Cấu hình
    - store.js
        - Cấu hình bỏ file rootReducer
        
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
        
    - Slice redux - filters.js
        - Thuộc tính name kết hợp với hàm trong reducers sẽ tạo ra type `filters/searchText` `filters/searchStatus`
        
        ```jsx
        import { createSlice } from "@reduxjs/toolkit";
        
        const filtersReducerSlice = createSlice(
            {
                name: 'filters',
                initialState: {
                    search: "",
                    status: "All"
                },
                reducers: {
                    searchText: (state, action) => {
                        state.search = action.payload;
                    },
                    searchStatus: (state, action) => {
                        state.status = action.payload;
                    }
                }
            }
        );
        
        export default filtersReducerSlice;
        ```
        
    - Cách gửi action để để cập nhật state
        
        ```jsx
        import { useDispatch } from 'react-redux';
        import filtersReducerSlice from "../../store/reducer-slices/filters";
        
        export default function Example() {
        		const dispatch = useDispatch();
        		
        		const handleClick = () => {
        				dispatch(
        						filtersReducerSlice.actions.searchText(/* payload */)
        				);
        		}
        		
        		return <button onClick={handleClick}></button>
        }
        ```