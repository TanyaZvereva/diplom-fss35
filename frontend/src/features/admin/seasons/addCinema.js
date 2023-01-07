import React, {useState} from 'react';
import {createFilmAsync, getFilmsAsync} from "../CinemahallSlice";
import {useDispatch} from "react-redux";

function AddCinema({setIsModalOpen}) {
  const dispatch = useDispatch()
  const [info, setInfo] = useState('')
  const [duration, setDuration] = useState(0)
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      dispatch(createFilmAsync({
        info,
        duration,
        callback: () => {
          dispatch(getFilmsAsync())
          setIsModalOpen(false)
        }
      }))
    }}>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="rows">
        Название фильма
        <input
          className="conf-step__inputв"
          type="text"
          placeholder="name"
          id="rows"
          required
          value={info}
          onChange={(e) => setInfo(e.currentTarget.value)}
        />
      </label>

      <label className="conf-step__label conf-step__label-fullsize" htmlFor="rows">
        Продолжительность
        <input
          className="conf-step__inputв"
          type="text"
          placeholder="Длительность"
          id="rows"
          required
          value={duration}
          onChange={(e) => setDuration(Number(e.currentTarget.value))}
        />
      </label>

      <div className="conf-step__buttons text-center">
        <input type="submit" value="Добавить фильм" className="conf-step__button conf-step__button-accent"/>
        <button className="conf-step__button conf-step__button-regular" onClick={() => setIsModalOpen(false)}>Отменить</button>
      </div>
    </form>
  );
}

export default AddCinema;
