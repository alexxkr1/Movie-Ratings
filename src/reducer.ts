import { combineReducers } from "@reduxjs/toolkit";
import moviesSlice from "@/features/movies/moviesSlice";
export default combineReducers({
  movie: moviesSlice,
});
