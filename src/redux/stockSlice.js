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