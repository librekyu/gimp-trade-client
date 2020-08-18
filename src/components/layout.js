import React, { useEffect } from 'react';
import { Initialize, Flush } from '../initialize';

const Layout = (props) => {
  const { routerInfo } = props;

  useEffect(() => {
    console.log('mount');
    Initialize();
    return () => {
      console.log('unmount');
      Flush();
    };
  }, []);
  return (
    <div>Layout<br />
      {props.children}
    </div>
  );
};

export default Layout;
