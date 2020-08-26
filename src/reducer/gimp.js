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
            draft.gimpMarginsData = action.data.response;
            break;
        }
        case GIMP_ACTION.GIMP_MARGINS_FAILURE: {
            draft.error = action.error;
            break;
        }
        default: {
            break;
        }
    }
});

export default gimpReducer;
