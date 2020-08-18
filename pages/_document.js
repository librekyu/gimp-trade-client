import React from 'react';
import Document, { Main, NextScript } from 'next/document';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import PropTypes from 'prop-types';

class GimpTradeDocs extends Document {
  static getInitialProps(context) {
    const sheet = new ServerStyleSheet();
    const page = context.renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();

    return {
      ...page,
      helmet: Helmet.renderStatic(),
      styleTags
    };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <html {...htmlAttrs}>
      <head title={''}>
        {this.props.styleTags}
        {Object.values(helmet)
          .map(el => el.toComponent())}
      </head>
      <body {...bodyAttrs}>
      <Main/>
      <NextScript/>
      </body>
      </html>
    );
  }
}

GimpTradeDocs.propTypes = {
  helmet: PropTypes.object.isRequired,
  styleTags: PropTypes.array.isRequired,
};

export default GimpTradeDocs;
