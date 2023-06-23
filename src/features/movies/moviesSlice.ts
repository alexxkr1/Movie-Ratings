import { createSlice } from "@reduxjs/toolkit";
import { httpClient } from "@/axios";

interface RootState {
  counter: {
    firstName: string;
    value: number;
    movies: [];
  };
}

export const movieSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    firstName: "Alex",
    movies: [],
  },
  reducers: {
    increment: (state) => {},
    getMovies: (state, action) => {
      try {
        //@ts-ignore
        state.movies = [...action.payload];

        console.log("state", state);

        console.log("movies", state.movies);
      } catch (error) {
        console.error(error);
      }
    },
    decrement: (state) => {},
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, getMovies } =
  movieSlice.actions;
export const value = (state: RootState) => state.counter.firstName;
export default movieSlice.reducer;
