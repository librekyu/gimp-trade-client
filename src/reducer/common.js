import React from 'react';
import produce from 'immer';

export const initialState = {
  commonState: {},
  error: {},
};

export const COMMON_ACTION = {
  REQUEST: 'COMMON_REQUEST',
  SUCCESS: 'COMMON_SUCCESS',
  FAILURE: 'COMMON_FAILURE',

};

const commonReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case COMMON_ACTION.REQUEST: {
      draft = initialState;
      break;
    }
    case COMMON_ACTION.SUCCESS: {
      draft.commonState = action.data;
      break;
    }
    case COMMON_ACTION.FAILURE: {
      draft.commonState = {};
      draft.error = action.error;
      break;
    }
    default: {
      break;
    }
  }
});

export default commonReducer;
