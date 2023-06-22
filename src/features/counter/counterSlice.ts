import { createSlice } from "@reduxjs/toolkit";

interface RootState {
  counter: {
    firstName: string;
    value: number;
  };
}

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    firstName: "Alex",
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value += 1;
      console.log(value);
    },
    decrement: (state) => {
      state.value -= 1;
      console.log(state.value);
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const value = (state: RootState) => state.counter.firstName;
export default counterSlice.reducer;
