import React, {useEffect, useState} from 'react';
import Modal from '../../../components/Modal'
import AddCinema from './addCinema'
import {getFilmsAsync, removeFilmAsync, getSessionsAsync} from "../CinemahallSlice";
import {useSelector, useDispatch} from "react-redux";
import CloseImg from "../../../i/close.png";
import AddSeason from "./addSeason";
import moment from 'moment'

function Seasons() {
  const dispatch = useDispatch()
  const [isOpenFilm, setIsOpenFilm] = useState(false)
  const [isOpenSeason, setIsOpenSeason] = useState(false)
  const {movies, sessions} = useSelector(state => state.cinemahall)

  useEffect(() => {
    dispatch(getFilmsAsync())
    dispatch(getSessionsAsync())
  }, [])

  useEffect(() => {
    dispatch(getSessionsAsync())
    dispatch(getFilmsAsync())
  }, [isOpenSeason])

  return (
    <>
      <p className="conf-step__paragraph">
        <button
          className="conf-step__button conf-step__button-accent"
          onClick={() => setIsOpenFilm(true)}
        >
          Добавить фильм
        </button>
        <button
          className="conf-step__button conf-step__button-accent"
          onClick={() => setIsOpenSeason(true)}
        >Поместить в сетку</button>
      </p>
      <div className="conf-step__movies">
        {movies.map(movie => <div className="conf-step__movie" key={movie.id}>
          <h3 className="conf-step__movie-title">{movie.info}</h3>
          <p className="conf-step__movie-duration">{movie.duration} минут</p>
          <img
            className="conf-step__movie-remove"
            src={CloseImg}
            onClick={() => dispatch(removeFilmAsync({film_id: movie.id, callback: () => dispatch(getFilmsAsync())}))}
            alt="Удалить"
          />
        </div>)}
      </div>

      <div className="conf-step__seances">
        {Object.keys(sessions).map(session => {
          return <div className="conf-step__seances-hall">
            <h3 className="conf-step__seances-title">Зал {session}</h3>
            <div className="conf-step__seances-timeline">
              {Object.values(sessions[session]).map(film => {
                return <div
                  key={film.info}
                  className="conf-step__seances-movie"
                  style={{width: film.duration + "px", backgroundColor: "rgb(133, 255, 137)", left: (moment('1970-01-01T' + film.time_start).unix() / 120) + 'px'}}
                >
                  <p className="conf-step__seances-movie-title">{film.info}</p>
                  <p className="conf-step__seances-movie-start">{film.time_start}</p>
                </div>
              })}

            </div>
          </div>
        })}
      </div>

      <fieldset className="conf-step__buttons text-center">
        <button className="conf-step__button conf-step__button-regular">Отмена</button>
        <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"/>
      </fieldset>

      {isOpenFilm && <Modal setIsOpen={setIsOpenFilm} title="Добавление Фильма">
        <AddCinema setIsModalOpen={setIsOpenFilm}/>
      </Modal>}
      {isOpenSeason && <Modal setIsOpen={setIsOpenSeason} title="Добавление Фильма">
        <AddSeason setIsModalOpen={setIsOpenSeason}/>
      </Modal>}
    </>
  );
}

export default Seasons;
