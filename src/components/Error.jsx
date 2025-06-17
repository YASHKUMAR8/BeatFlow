import React from 'react';

const Error = ({ message = 'Something went wrong. Please try again later.' }) => (
  <div className="w-full flex flex-col justify-center items-center">
    <h1 className="font-bold text-2xl text-white mt-2">
      {message}
    </h1>
  </div>
);

export default Error;
