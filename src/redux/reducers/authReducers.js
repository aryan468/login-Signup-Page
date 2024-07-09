// src/redux/reducers/authReducers.js

import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authTypes';



const initialState = {
  isLoggedIn: false,
  token: null,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
      };
    case LOGIN_FAILURE:
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
