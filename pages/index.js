import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { COMMON_MESSAGE } from '../src/const/commonMessage';
import ChartComponent from '../src/components/chart-component';
import Util from "../src/util/Util";
import dummy from "../src/dummy/dummy";
import {useDispatch, useSelector} from "react-redux";
import {GIMP_ACTION} from "../src/reducer/gimp";

const Home = (props) => {

    const dispatch = useDispatch();

    const { gimpMarginsData } = useSelector((state) => state.gimp);

    useEffect(() => {
      // dispatch({
      //   type: GIMP_ACTION.GIMP_MARGINS_REQUEST
      // });
    }, []);

  // const onClickButton = useCallback((e) => {
  //   e.preventDefault();
  //   Router.push('/router/inputRouter');
  // }, []);

  return (
    <>
      {COMMON_MESSAGE.INDEX_WELCOME_STRING}
      <br/>
      <div>
      <ChartComponent
        chartData={Util.convertGimpDataToChartData(dummy)}
        // chartData={Util.convertGimpDataToChartData(gimpMarginsData)}
        type={'line'}
        height={200}
      />

      </div>
            {/*<button onClick={onClickButton}>To inputRouter</button>*/}
    </>
  );
};

Home.getInitialProps = (props) => {
  console.log('*****************  Home get initial props  ***************************');
};

export default Home;
