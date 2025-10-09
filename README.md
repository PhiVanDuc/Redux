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

### Cách cài đặt

- Nếu dùng Javascript thuần `npm install redux redux-devtools-extension`
- Nếu dùng React.js `npm install redux react-redux redux-devtools-extension`

### Cách hoạt động

![Ảnh minh họa cách hoạt động của Redux (Chưa có middleware)](image.png)

Ảnh minh họa cách hoạt động của Redux (Chưa có middleware)

1. Tạo một store, đây là kho lưu trữ state toàn cục của ứng dụng
    - Store được cấu thành từ reducer và là nguồn dữ liệu duy nhất trong Redux
2. Store có một root reducer duy nhất, và root reducer có thể được kết hợp từ nhiều slice reducer
    - Mỗi slice reducer quản lý một phần riêng của state (ví dụ: user, cart, product, v.v.), và chứa state khởi tạo + các action + logic cập nhật state
3. Reducer là hàm pure function, nhận vào state hiện tại và action, trả về state mới. Không được mutate state trực tiếp mà phải trả về object/array mới
4. UI (component) lấy state từ store, hiển thị dữ liệu lên giao diện. Khi state trong store thay đổi, Redux tự động kiến UI re-render phần liên quan
5. Khi người dùng tương tác (click, nhập liệu, v.v.), logic trong event handler sẽ xác định cần cập nhật gì, và chuẩn bị dữ liệu (payload) cho hành động đó
6. Action là mô tả về việc muốn thay đổi state, thường có:
    - `type`: Tên hành động
    - `payload`: Dữ liệu kèm theo
    - Sau đó action được gửi (dispatch) đến store
    - Store chuyển action đó vào reducer tương ứng, reducer xử lý và trả về state mới

### Lấy state & Cập nhật State

- Sử dụng hook `useSelector` lấy ra state mong muốn

```
import { useSelector } from 'react-redux';

export default function Example() {
		const stateExample = useSelector(state => {
				// Thực hiện logic lấy ra state
				return state.stateExample;
		});
		
    return <></>
}
```

- Sử dụng hook `useDispatch` gửi action đến reducer - cập nhật state

```
import { useDispatch } from 'react-redux';

export default function Example() {
		const dispatch = useDispatch();
		
		const handleClick = () => {
				const action = {
						type: "Name of action"
						payload: { . . . }
				}
				
				dispatch(action);
		}
		
		return <button onClick={handleClick}>Click Me</button>
}
```