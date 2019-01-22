import React from 'react';

import Video from '../video/Video';
import ClipsList from '../clips-list/ClipsList';
import './App.css';

export const App = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12 mb-2">
        <h1>
          Clipapp
          {' '}
          <small>By cfagudelo96</small>
        </h1>
      </div>
      <div className="col-md-8 col-xs-12">
        <Video />
      </div>
      <div className="col-md-4 col-xs-12">
        <ClipsList />
      </div>
    </div>
  </div>
);

export default App;
