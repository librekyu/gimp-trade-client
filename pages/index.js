import React, { useCallback } from 'react';
import Router from 'next/router';
import { COMMON_MESSAGE } from '../src/const/commonMessage';
import ChartComponent from '../src/components/chart-component';

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
        chartData={{
          labels: ['a', 'b', 'c', 'd', 'e'],
          datasets: [
            {
              data: [10, 20, 300, 50, 100]
            }
          ],
        }}
        type={'line'}
        height={200}
      />

      </div>
            {/* <button onClick={onClickButton}>To inputRouter</button> */}
    </>
  );
};

Home.getInitialProps = (props) => {
  console.log('*****************  Home get initial props  ***************************');
};

export default Home;
