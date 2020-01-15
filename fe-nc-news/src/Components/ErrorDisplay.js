import React from 'react';

const ErrorDisplay = ({ error }) => {
  return (
    <h3 id="err-msg">
      {error.status}: {error.msg}
    </h3>
  );
};

export default ErrorDisplay;
