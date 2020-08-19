import React from 'react';
import Router from 'next/router';

const Initialize = () => {
  Router.beforePopState((param) => {
    console.log(param, 'next router before pop state!');
    return true;
  });
};

const Flush = () => {
  console.log('flush!');
  
};

export { Initialize, Flush };
