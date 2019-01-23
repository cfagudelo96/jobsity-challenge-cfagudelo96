import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/app/App';
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
    clips: { ids: [0], entities: { 0: defaultClip }, nextClipId: 1, selectedClipId: 0 }
  };
};

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet
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
