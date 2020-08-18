import React, { useEffect } from 'react';

import withRedux from 'next-redux-wrapper';
import Helmet from 'react-helmet';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import Util from '../src/util/Util';

import rootReducer from '../src/reducer';
import rootSaga from '../src/sagas';
import Layout from '../src/components/layout';

const GimpTrade = ({ Component, store, pageProps, routerInfo }) => {
  const parsedRouterInfo = routerInfo;

  return (
    <Provider store={store}>
      <Helmet
        title="Gimp Trade"
        htmlAttributes={{ lang: 'ko' }}
        meta={[{
          charSet: 'UTF-8',
        }, {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover'
          // content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }, {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge',
        }, {
          name: 'description',
          content: 'gimp-trade-client',
        }, {
          name: 'og:title',
          content: 'ReactJS Practice'
        }, {
          name: 'og:description',
          content: 'gimp-trade-client'
        }, {
          property: 'og:type',
          content: 'website',
        }, {
          'http-equiv': 'content-Type',
          content: 'text/html;charset=utf-8',
        }]}
      >

      </Helmet>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </Provider>
  );
};


GimpTrade.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const routerInfo = context.router;

  // 각 페이지 별로 컴포넌트들이 getInitialProps 를 선언하면 컨텍스트를 컴포넌트들이 받게된다.
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
  }

  return {
    pageProps,
    routerInfo
  };
};

// redux, redux-saga 설정
const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    );
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
};

export default withRedux(configureStore)(GimpTrade);
