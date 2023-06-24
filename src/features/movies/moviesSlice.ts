import { createSlice } from "@reduxjs/toolkit";
import { httpClient } from "@/axios";

export const movieSlice = createSlice({
  name: "counter",
  initialState: {
    movies: [],
    tvShows: [],
    searchResults: []
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
    getSearchResults: (state, action) => {
      //@ts-ignore
      state.searchResults = [...action.payload];

      console.log("searchResults", state.searchResults);
   },
  },
});

// Action creators are generated for each case reducer function
export const { getTvShows, getMovies, getSearchResults } = movieSlice.actions;
export default movieSlice.reducer;
