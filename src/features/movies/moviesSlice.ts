import { createSlice } from "@reduxjs/toolkit";
import { httpClient } from "@/axios";

export const movieSlice = createSlice({
  name: "counter",
  initialState: {
    movies: [],
    tvShows: [],
    searchResults: [],
    totalSearchPageResults: 0,
    totalResultsMovies: 0,
    totalResultsTVShows: 0,
  },
  reducers: {
    getMovies: (state, action) => {
      try {
        const { results, total_pages } = action.payload;

        //@ts-ignore
        state.movies = [...results];
        state.totalResultsMovies = total_pages;

      } catch (error) {
        console.error(error);
      }
    },
    getTvShows: (state, action) => {
      const { results, total_pages } = action.payload;

      //@ts-ignore
      state.tvShows = [...results];
      state.totalResultsTVShows = total_pages;

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
