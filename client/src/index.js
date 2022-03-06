import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css'
import rootReducer from './reducers'

const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
