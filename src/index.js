import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';

const getPreloadedState = () => {
  const defaultClip = {
    id: 0,
    title: 'Full video',
    startTime: 0,
    endTime: 52
  };

  const defaultVideo = {
    src: '/videos/test-video.mp4',
    duration: 52
  };

  return {
    video: defaultVideo,
    clips: { 0: defaultClip },
    selectedClip: 0
  };
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  getPreloadedState(),
  devToolsEnhancer({ name: 'clipapp' })
);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
