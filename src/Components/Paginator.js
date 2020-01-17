import React from 'react';

const Paginator = ({ page, count, handleClick }) => {
  return (
    <section id="page-btns">
      <button
        onClick={() => {
          handleClick(-1);
        }}
        disabled={page === 1}
      >
        Prev
      </button>
      <button
        onClick={() => {
          handleClick(1);
        }}
        disabled={page === Math.ceil(count / 10)}
      >
        Next
      </button>
    </section>
  );
};

export default Paginator;
