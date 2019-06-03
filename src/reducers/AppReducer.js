import * as ActionTypes from '../actions/ActionTypes';

export const appReducer = (state = {
    isLoading: false,
    weatherData: null,
    errorMessage: null
}, action) => {
    switch(action.type) {
        case ActionTypes.API_STARTED:
            return {
                ...state,
                isLoading: true,
                errorMessage: null
            }
        case ActionTypes.API_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                weatherData: action.payload
            }
        case ActionTypes.API_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            }
        default: 
            return state;
    }
}