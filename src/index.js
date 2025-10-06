import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Sử dụng Redux Store cho toàn bộ dự án
import store from './store/store';
import { Provider } from 'react-redux';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));