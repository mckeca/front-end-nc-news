import React from 'react';

const ErrorDisplay = ({ err }) => {
  return (
    <h3 id="err-msg">
      {err.status}: {err.data.msg}
    </h3>
  );
};

export default ErrorDisplay;
