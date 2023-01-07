import React, {useState} from 'react';
import {createSessionAsync} from "../CinemahallSlice";
import {useDispatch, useSelector} from "react-redux";

function AddSeason({setIsModalOpen}) {
  const dispatch = useDispatch()
  const {cinemahalls, movies} = useSelector(state => state.cinemahall)
  const [season, setSeason] = useState({movie_id: null, cinemahall_id: null, time_start: null})

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      dispatch(createSessionAsync(season))
      setIsModalOpen(false)
    }}>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="rows">
        Select movie
        <select
          onChange={(e) => setSeason(prev => ({...prev, movie_id: e.target.value}))}
        >
          {movies.map((movie, key) => <option key={movie?.id + key} value={movie?.id}>{movie?.info}</option>)}
        </select>
      </label>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="rows">
        Select cinema hall
        <select
          onChange={(e) => setSeason(prev => ({...prev, cinemahall_id: e.target.value}))}
        >
          {cinemahalls.map((cinemahall, key) => <option key={cinemahall?.id + key} value={cinemahall.id}>{cinemahall.id}</option>)}
        </select>
      </label>

      <label className="conf-step__label conf-step__label-fullsize" htmlFor="rows">
        Select time
        <input
          type="time"
          onChange={(e) => setSeason(prev => ({...prev, time_start: e.target.value}))}
        />
      </label>

      <div className="conf-step__buttons text-center">
        <input type="submit" value="Добавить сеанс" className="conf-step__button conf-step__button-accent"/>
        <button className="conf-step__button conf-step__button-regular" onClick={() => setIsModalOpen(false)}>Отменить</button>
      </div>
    </form>
  );
}

export default AddSeason;
