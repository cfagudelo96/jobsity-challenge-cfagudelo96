import React from 'react';

import './Loading.css';

export const Loading = () => (
  <div className="loading d-flex justify-content-center align-items-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loading;
