import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "@/features/counter/counterSlice";

export default combineReducers({
  counter: counterSlice,
});
