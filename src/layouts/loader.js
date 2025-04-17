import React from 'react';
import { Spinner } from 'evergreen-ui';

function Loader() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Spinner />
    </div>
  );
}

export default Loader;
