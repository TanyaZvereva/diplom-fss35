import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
  sessions: [],
  activeSession: null,
  activePlaces: null,
  buyedPlace: null,
  isLoading: false
};

export const getSessionsAsync = createAsyncThunk(
  'client/sessions',
  async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/user/client/')
    return response.data;
  }
);

export const getPlacesAsync = createAsyncThunk(
  'client/places',
  async (hall) => {
    const response = await axios.get('http://127.0.0.1:8000/api/user/places/'+ hall)
    return response.data;
  }
);

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setSession(state, action) {
      state.activeSession = action.payload
    },
    buyPlace(state, action) {
      state.buyedPlace = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessionsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessionsAsync.fulfilled, (state,action) => {
        state.isLoading = false;
        state.sessions = action.payload;
      })
      .addCase(getSessionsAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPlacesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlacesAsync.fulfilled, (state,action) => {
        state.isLoading = false;
        state.activePlaces = action.payload;
      })
      .addCase(getPlacesAsync.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export const { setSession, buyPlace } = clientSlice.actions

export default clientSlice.reducer;
