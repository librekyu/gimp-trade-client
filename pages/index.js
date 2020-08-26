import React, { useCallback } from 'react';
import Router from 'next/router';
import { COMMON_MESSAGE } from '../src/const/commonMessage';
import ChartComponent from '../src/components/chart-component';
import Util from "../src/util/Util";
import dummy from "../src/dummy/dummy";

const Home = (props) => {
  const onClickButton = useCallback((e) => {
    e.preventDefault();
    Router.push('/router/inputRouter');
  }, []);

  return (
    <>
      {COMMON_MESSAGE.INDEX_WELCOME_STRING}
      <br/>
      <div>
      <ChartComponent
        chartData={Util.convertGimpDataToChartData(dummy)}
        type={'line'}
        height={200}
      />

      </div>
            <button onClick={onClickButton}>To inputRouter</button>
    </>
  );
};

Home.getInitialProps = (props) => {
  console.log('*****************  Home get initial props  ***************************');
};

export default Home;
