import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'


const initialState = {
  cinemahalls: [],
  sessions: [],
  places: [],
  movies: [],
  isLoading: false
};

export const createCinemaHallAsync = createAsyncThunk(
  'cinemahall/createCinemaHall',
  async ({count_x, count_y, callback}) => {
    const response = await axios.post('http://127.0.0.1:8000/api/cinemahall', {count_x, count_y})
    callback && callback()
    return response.data;
  }
);

export const createFilmAsync = createAsyncThunk(
  'cinemahall/createFilmAsync',
  async ({info, duration, callback}) => {
    const response = await axios.post('http://127.0.0.1:8000/api/movie', {info, duration})
    callback && callback()
    return response.data;
  }
);

export const createSessionAsync = createAsyncThunk(
  'cinemahall/createSession',
  async ({time_start, cinemahall_id, movie_id}) => {
    const response = await axios.post('http://127.0.0.1:8000/api/session', {time_start, cinemahall_id, movie_id})
    return response.data;
  }
);

export const editCinemaHallAsync = createAsyncThunk(
  'cinemahall/editCinemaHall',
  async ({id, price, price_vip, callback}) => {
    const response = await axios.put('http://127.0.0.1:8000/api/cinemahall', {id, price, price_vip})
    callback && callback()
    return response.data;
  }
);

export const getCinemaHallAsync = createAsyncThunk(
  'cinemahall/getCinemaHall',
  async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/cinemahall')
    return response.data;
  }
);

export const getFilmsAsync = createAsyncThunk(
  'cinemahall/getFilms',
  async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/movie')
    return response.data;
  }
);
export const getSessionsAsync = createAsyncThunk(
  'cinemahall/getSessions',
  async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/session')
    return response.data;
  }
);

export const removeFilmAsync = createAsyncThunk(
  'cinemahall/RemoveFilm',
  async ({film_id, callback}) => {
    const response = await axios.delete('http://127.0.0.1:8000/api/movie/' + film_id)
    callback && callback()
    return response.data;
  }
);

export const getPlacesAsync = createAsyncThunk(
  'cinemahall/getPlaces',
  async (hallId) => {
    const response = await axios.get('http://127.0.0.1:8000/api/place?hall_id=' + hallId)
    return response.data;
  }
);

export const updatePlacesAsync = createAsyncThunk(
  'cinemahall/updatePlaces',
  async (places) => {
    const response = await axios.put('http://127.0.0.1:8000/api/place', {places})
    return response.data;
  }
);

export const removeCinemaHallAsync = createAsyncThunk(
  'cinemahall/removeCinemaHall',
  async ({id, callback}) => {
    const response = await axios.delete('http://127.0.0.1:8000/api/cinemahall/' + id)
    callback && callback()
    return response.data;
  }
);

export const cinemahallSlice = createSlice({
  name: 'cinemahall',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createCinemaHallAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCinemaHallAsync.fulfilled, (state,) => {
        state.isLoading = false;
      })
      .addCase(editCinemaHallAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCinemaHallAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
      })
      .addCase(getCinemaHallAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCinemaHallAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cinemahalls = action.payload;
      })
      .addCase(getPlacesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlacesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.places = action.payload;
      })
      .addCase(createFilmAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFilmAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getFilmsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilmsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(removeFilmAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFilmAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createSessionAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSessionAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getSessionsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessionsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessions = action.payload;
      })
      .addCase(updatePlacesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePlacesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const selectUser = (state) => state.auth.user;

export default cinemahallSlice.reducer;
