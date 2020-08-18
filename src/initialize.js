import React from 'react';
import Router from 'next/router';

const Initialize = () => {
  Router.beforePopState((param) => {
    console.log(param, 'next router before pop state!');
  });
};

const Flush = () => {
  console.log('flush!');
  Router.beforePopState(undefined);
};

export { Initialize, Flush };
