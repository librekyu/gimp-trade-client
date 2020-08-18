import React from 'react';
import { COMMON_MESSAGE } from '../../src/const/commonMessage';

const OutputRouter = (props) => {
  return (
    <>
      {COMMON_MESSAGE.OUTPUT_ROUTER_WELCOME_STRING}
    </>
  );
};

OutputRouter.getInitialProps = (props) => {
  console.log('*****************  OutputRouter get initial props  ***************************');
};

export default OutputRouter;
