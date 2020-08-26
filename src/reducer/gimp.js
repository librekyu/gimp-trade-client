import produce from 'immer';

export const initialState = {
    gimpMarginsData: [],
    error: {},
};

export const GIMP_ACTION = {
    GIMP_MARGINS_REQUEST: 'GIMP_MARGINS_REQUEST',
    GIMP_MARGINS_SUCCESS: 'GIMP_MARGINS_SUCCESS',
    GIMP_MARGINS_FAILURE: 'GIMP_MARGINS_FAILURE',

};

const gimpReducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case GIMP_ACTION.GIMP_MARGINS_REQUEST: {
            draft = initialState;
            break;
        }
        case GIMP_ACTION.GIMP_MARGINS_SUCCESS: {
            draft.commonState = action.data;
            break;
        }
        case GIMP_ACTION.GIMP_MARGINS_FAILURE: {
            draft.commonState = {};
            draft.error = action.error;
            break;
        }
        default: {
            break;
        }
    }
});

export default gimpReducer;
