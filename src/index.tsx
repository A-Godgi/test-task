import React from 'react';
import ReactDOM from 'react-dom/client';

//Normalize.css
import 'normalize.css';

//Main component
import App from './App';

//Redux store
import { Provider } from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";
import {testTaskApi} from "./store/api";

const store = configureStore({ reducer: {
        [testTaskApi.reducerPath]: testTaskApi.reducer,
    }, devTools: true, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(testTaskApi.middleware)});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);