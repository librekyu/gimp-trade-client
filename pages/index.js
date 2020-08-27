import React, {useCallback, useEffect, useState} from 'react';
import Router from 'next/router';
import {COMMON_MESSAGE} from '../src/const/commonMessage';
import dynamic from "next/dynamic";
import Util from "../src/util/Util";
import dummy from "../src/dummy/dummy";
import {useDispatch, useSelector} from "react-redux";
import {GIMP_ACTION} from "../src/reducer/gimp";

/** Hammer.js, zoom plugin이 window 객체를 사용하기 때문에 SSR 하면 안됨. */
const ChartComponent = dynamic(() => import('../src/components/chart-component'), {ssr: false});

const Home = (props) => {

  const dispatch = useDispatch();

  const {gimpMarginsData} = useSelector((state) => state.gimp);

  const [timer, setTimer] = useState(new Date());

  useEffect(() => {

  }, []);

  /**
   * @todo 추후에 API 열리면 해당 코드 주석 해제 후 timer, renderTimer 코드 제거
   * @author kimhg
   * */
  useEffect(() => {

    const timerID = setInterval(
      () => {
        setTimer(new Date());
        // dispatch({
        //   type: GIMP_ACTION.GIMP_MARGINS_REQUEST
        // });
      }, 60000);

    return () => {
      clearInterval(timerID);
    };
  }, [timer]);

  const renderTimer = useCallback(() => {
    return (
      <div>{timer.getTime()}</div>
    );
  }, [timer]);


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
      {renderTimer()}
      {/*<button onClick={onClickButton}>To inputRouter</button>*/}
    </>
  );
};

// Home.getInitialProps = (props) => {
//   console.log('*****************  Home get initial props  ***************************');
// };

export default Home;
