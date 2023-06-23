import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "@/features/counter/counterSlice";
import moviesSlice from "@/features/movies/moviesSlice";
export default combineReducers({
  counter: counterSlice,
  movie: moviesSlice,
});
