import React, {useEffect, useMemo} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSessionsAsync, setSession} from './ClientSlice'
import TimeLine from '../../components/TimeLine'
import _ from 'lodash'

function Client() {
  const dispatch = useDispatch()
  const {sessions} = useSelector(state => state.client)
  const uniqMovies = useMemo(() => _.uniqBy(sessions, 'movie_id'), [sessions, sessions.length])

  useEffect(() => {
    dispatch(getSessionsAsync())
  }, [])

  return (
    <div className="Client">
      <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
      </header>
      <TimeLine/>

      <main>
        {uniqMovies.map(movie => {
          const movieHalls = _.uniqBy(sessions.filter(f => f.movie_id === movie.movie_id), 'cinemahall_id')

          return <section className="movie">
            <div className="movie__info">
              <div className="movie__poster">
                {/*<img className="movie__poster-image" alt="Звёздные войны постер" src="i/poster1.jpg"/>*/}
              </div>
              <div className="movie__description">
                <h2 className="movie__title">{movie.info}</h2>
                {/*<p className="movie__synopsis">Очень интересный фильм</p>*/}
                <p className="movie__data">
                  <span className="movie__data-duration">{movie.duration} минут</span>
                  {/*<span className="movie__data-origin">США</span>*/}
                </p>
              </div>
            </div>
            {movieHalls.map(hall => {
              const movieSessions = sessions.filter(f => f.cinemahall_id === hall.cinemahall_id && f.movie_id === movie.movie_id)
              return <div className="movie-seances__hall">
                <h3 className="movie-seances__hall-title">Зал {hall.cinemahall_id}</h3>
                <ul className="movie-seances__list">
                  {movieSessions.map(session => {
                    return <li className="movie-seances__time-block" onClick={() => dispatch(setSession(session))}>
                      <Link className="movie-seances__time" to="/hall">{session?.time_start?.slice(0, -3)}</Link>
                    </li>
                  })}
                </ul>
              </div>
            })}
          </section>
        })}
      </main>
    </div>
  );
}

export default Client;
