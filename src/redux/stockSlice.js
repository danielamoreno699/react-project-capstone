import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiURL = 'https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&apiKey=Vp4PFtmRiJhA03_A8hWFal2787C86E4P';

// fetching stocks form home page
export const fetchData = createAsyncThunk('stocks/fetchData', async () => {
  const response = await fetch(apiURL);
  if (response.ok) {
    const data = await response.json();
    return data.results;
  }
  throw new Error('Failed to fetch data');
});

// fetching details of stock passing the parameter of stock
export const fetchStockInfo = createAsyncThunk(
    'stocks/fetchStockInfo',
    async (stock) => {
      const response = await fetch(`https://api.polygon.io/v3/reference/tickers/${stock}?apiKey=Vp4PFtmRiJhA03_A8hWFal2787C86E4P`);
      if (response.ok) {
        const data = await response.json();
        return data.results;
      }
      throw new Error('Failed to fetch stock information');
    },
  );

  const initialState = {
    status: 'idle',
    data: [],
    selectedStock: null,
    stockInfo: {},
  
  };
  
  export const stockSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
      selectStock: (state, action) => {
        const selectedStock = action.payload;
        return {
          ...state,
          selectedStock,
          stockInfo: {},
        };
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchData.fulfilled, (state, action) => ({
            ...state,
            status: 'succeeded',
            data: action.payload,
          }))
          .addCase(fetchData.rejected, (state, action) => ({
            ...state,
            status: 'failed',
            error: action.error.message,
          }))
          .addCase(fetchStockInfo.fulfilled, (state, action) => ({
            ...state,
            status: 'succeeded',
            stockInfo: action.payload,
          }))
          .addCase(fetchStockInfo.rejected, (state, action) => ({
    
            ...state,
            status: 'failed',
            error: action.error.message,
          }));
      },
    });

    export const { selectStock } = stockSlice.actions;
export default stockSlice.reducer;