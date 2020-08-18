import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { COMMON_MESSAGE } from '../../src/const/commonMessage';

const InputRouter = (props) => {
  useEffect(() => {
    console.log('input Router mount');

    return () => {
      console.log('input Router unmount');
    };
  }, []);

  const onClickButton = useCallback((e) => {
    e.preventDefault();
    Router.push('/router/outputRouter');
  }, []);

  return (
    <>
      {COMMON_MESSAGE.INPUT_ROUTER_WELCOME_STRING}
      <br/>
      <button onClick={onClickButton}>To outputRouter</button>
    </>
  );
};

InputRouter.getInitialProps = (props) => {
  console.log('*****************  InputRouter get initial props  ***************************');
};

export default InputRouter;
