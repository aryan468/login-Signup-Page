// src/redux/actions/authActions.js

export const LOGOUT = 'LOGOUT';


export const logout = () => {
 
  localStorage.removeItem('token');

  return {
    type: LOGOUT
  };
};
