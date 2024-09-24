import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IntialState = {
  rows: number;
  page: number;
};

const initialState: IntialState = {
  rows: 50,
  page: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setRowsPerPage: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload === undefined) return;
      state.rows = action.payload;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export default productSlice.reducer;
