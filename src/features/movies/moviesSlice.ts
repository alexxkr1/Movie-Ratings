import { createSlice } from "@reduxjs/toolkit";
import { httpClient } from "@/axios";

export const movieSlice = createSlice({
  name: "counter",
  initialState: {
    movies: [],
    tvShows: [],
    searchResults: [],
    totalSearchPageResults: 0,
  },
  reducers: {
    getMovies: (state, action) => {
      try {
        //@ts-ignore
        state.movies = [...action.payload];
      } catch (error) {
        console.error(error);
      }
    },
    getTvShows: (state, action) => {
      //@ts-ignore
      state.tvShows = [...action.payload];
    },
    getSearchResults: (state, action) => {
      const { results, total_pages } = action.payload;

      //@ts-ignore
      state.searchResults = [...results];
      state.totalSearchPageResults = total_pages;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getTvShows, getMovies, getSearchResults } = movieSlice.actions;
export default movieSlice.reducer;
