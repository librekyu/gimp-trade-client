import axios from 'axios';
import CONST from '../common/globalConst';

axios.defaults.headers.common['X-Requested-with'] = 'XMLHttpRequest';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

// api 요청 주소
// const baseURL = process.env.REACT_APP_REACT_ENV === 'production'
//   ? 'http://localhost:3000'
//   : 'http://localhost:3000';

const instance = axios.create({
  baseURL: 'http://34.64.158.51:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


/**
 *  http 에러
 * */
class RequestError extends Error {
  constructor(message, status, code, processCode, errors) {
    // Calling parent constructor of base Error class.
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      // Capturing stack trace, excluding constructor call from it.
      Error.captureStackTrace(this, this.constructor);
    }

    // You can use any additional properties you want.
    // I'm going to use preferred HTTP status for this error types.
    // `500` is the default value if not specified.
    this.message = message || '';
    this.status = status || 500;

    this.code = code || 0;

    this.processCode = processCode || 0;

    this.errors = errors || [];
  }
}


/**
 * API 요청 공통
 * config = {
    url,
    method,
    data
 * }
 * */

const Request = (config) => {
  // console.warn('****** request ******* =>');
  let configure = {
    url: config.url,
    method: config.method
  };

  if (config.data != null) {
    configure.data = config.data;
  } else if (config.formData != null) {
    configure.data = config.formData;
  } else {
    configure.data = {};
  }

  if (config.params != null) {
    configure.params = config.params;
  }

  if (config.responseType != null) {
    configure.responseType = config.responseType;
  }

  if (config.body != null) {
    configure.body = config.body;
  }

  if (config.formData != null) {
    configure.headers = {
      ...configure.headers,
      'Content-Type': 'multipart/form-data;'
    };
  } else if (config.imgType != null) {
    configure.headers = {
      ...configure.headers,
      'Content-Type': 'image/png;'
    };
  } else {
    configure.headers = {
      ...configure.headers,
      'Content-Type': 'application/json'
    };
  }

  return instance(configure)
    .then((response) => {
      console.log('API response', config.url, response);

      const { status, data } = response;
      const { body, message } = data;
      switch (status) {
        case CONST.HTTP_STATUS_CODE.OK:
        case CONST.HTTP_STATUS_CODE.CREATE: {
          if (data instanceof Blob) {
            return data;
          } else if (config.isChart != null) { // 차트데이터인 경우 예외
            return data;
          } else if (config.imgType != null) {
            return data;
          } else {
            return message === CONST.HTTP_RESPONSE_MESSAGE.SUCCESS ? body : null;
          }
        }
        // Fail
        case CONST.HTTP_STATUS_CODE.BAD_REQUEST:
        case CONST.HTTP_STATUS_CODE.FORBIDDEN:
        case CONST.HTTP_STATUS_CODE.NOT_FOUND:
        case CONST.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR: {
          console.warn('오류');
          throw new RequestError(
            message,
            status
          );
        }
        default: {
          console.warn('else result');
          throw new RequestError(
            message,
            status
          );
        }
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log('API error.response', error.response);
        let errorMessage = '';
        if (error.response.data.errors && error.response.data.errors.length > 0) {
          errorMessage = error.response.data.errors[0].message;
        } else {
          errorMessage = error.response.data.message;
        }

        switch (error.response.status) {
          case CONST.HTTP_STATUS_CODE.BAD_REQUEST: {
            throw new RequestError(
              errorMessage,
              error.response.status || 400,
              error.response.code || 400,
              0,
              error.response.data.errors || []
            );
          }
          case CONST.HTTP_STATUS_CODE.FORBIDDEN: {
            throw new RequestError(
              error.response.data.message || '요청 권한이 없습니다. (403)',
              error.response.status || 403,
              error.response.code || 403,
              0,
              error.response.data.errors || []
            );
          }
          case CONST.HTTP_STATUS_CODE.NOT_FOUND: {
            throw new RequestError(
              error.response.data.message || '요청한 리소스가 없습니다. (404)',
              error.response.status || 404,
              error.response.code || 404,
              0,
              error.response.data.errors || []
            );
          }
          case CONST.HTTP_STATUS_CODE.UNAUTHORIZED: {
            throw new RequestError(
              errorMessage || '인증 되지 않은 접근 입니다. (401)',
              error.response.status || 401,
              error.response.code || 401,
              0,
              error.response.data.errors || []
            );
          }
          case CONST.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR: {
            if (error.response.data instanceof Blob && config.isImage) {
              return new Blob([], { type: 'image/png' });
            }
            throw new RequestError(
              '서버에러가 발생했습니다. 관리자에게 문의하세요.',
              error.response.status || 500,
              error.response.code || 500,
              0,
              error.response.data.errors || []
            );
          }
          default: {
            if (error.response.data instanceof Blob && config.isImage) {
              return new Blob([], { type: 'image/png' });
            }
            throw new RequestError(
              error.response.data.message || '통신 중 에러가 발생하였습니다. (500)',
              error.response.status || 500,
              error.response.code || 9999,
              0,
              error.response.data.errors || []
            );
          }
        }
      } else {
        console.log('API error.status', error);
        throw new RequestError(
          error.response.data.message || error.status,
          error.response.status || 500,
          error.response.code || 9999,
          0,
          error.response.data.errors || []
        );
        // throw error;
      }
    });
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export { RequestError, delay };

export default Request;
