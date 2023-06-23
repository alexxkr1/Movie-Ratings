import { createSlice } from "@reduxjs/toolkit";
import { httpClient } from "@/axios";

export const movieSlice = createSlice({
  name: "counter",
  initialState: {
    movies: [],
    tvShows: [],
  },
  reducers: {
    getMovies: (state, action) => {
      try {
        //@ts-ignore
        state.movies = [...action.payload];

        console.log("movies", state.movies);
      } catch (error) {
        console.error(error);
      }
    },
    getTvShows: (state, action) => {
       //@ts-ignore
       state.tvShows = [...action.payload];

       console.log("tv", state.tvShows);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getTvShows, getMovies } = movieSlice.actions;
export default movieSlice.reducer;
