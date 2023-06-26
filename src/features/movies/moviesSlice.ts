import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "@/axios";

export const fetchMovies = createAsyncThunk<
  any,
  { type: string; currentPage: number; keyword?: string }
>("fetchData", async ({ type, currentPage, keyword }) => {
  let endpoint = "";
  let result;

  switch (type) {
    case "movies":
      endpoint = "3/movie/popular";
      break;
    case "tvShows":
      endpoint = "3/tv/popular";
      break;
    case "searchResults":
      endpoint = "3/search";
      break;
  }

  if (type === "movies" || type === "tvShows") {
    const { data } = await httpClient.get(
      `${endpoint}?language=en-US&page=${currentPage}`
    );
    result = { data, type };
  } else {
    const { data } = await httpClient.get(
      `${endpoint}/movie?query=${keyword}&include_adult=false&language=en-US&page=${currentPage}`
    );
    result = { data, type };
  }
  return result;
});

export const movieSlice = createSlice({
  name: "counter",
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const { results, total_pages } = action.payload.data;
      const type = action.payload.type;
      console.log(type);
      if (type === "movies") {
        console.log("target");
        //@ts-ignore
        state.movies = [...results];
        if (total_pages < 20) {
          state.totalResultsMovies = total_pages;
        } else {
          state.totalResultsMovies = 20;
        }
      } else if (type === "tvShows") {
        //@ts-ignore
        state.tvShows = [...results];
        if (total_pages < 20) {
          state.totalResultsTVShows = total_pages;
        } else {
          state.totalResultsTVShows = 20;
        }
      } else if (type === "searchResults") {
        //@ts-ignore
        state.searchResults = [...results];
        if (total_pages < 20) {
          state.totalSearchPageResults = total_pages;
        } else {
          state.totalSearchPageResults = 20;
        }
      }

      state.isLoading = false;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      console.error("Error", action.payload);
      state.isLoading = false;
    });
  },
  initialState: {
    movies: [],
    tvShows: [],
    searchResults: [],
    totalSearchPageResults: 0,
    totalResultsMovies: 0,
    totalResultsTVShows: 0,
    isLoading: false,
  },
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = movieSlice.actions;
export default movieSlice.reducer;
