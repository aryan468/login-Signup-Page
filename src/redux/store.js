// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // Import the counter reducer

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
