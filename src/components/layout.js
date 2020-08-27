import React, {useEffect} from 'react';
import {Initialize, Flush} from '../initialize';

const Layout = (props) => {
  const {routerInfo} = props;

  useEffect(() => {
    console.log('mount');
    Initialize();
    return () => {
      console.log('unmount');
      console.log('closing...', routerInfo);
      Flush();
    };
  }, []);
  return (
    <div id={'wrap'}>
      <h2>Gimp Chart</h2>
      <div id={'contents'}>{props.children}</div>
    </div>
  );
};

export default Layout;
