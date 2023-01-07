import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getPlacesAsync, buyPlace} from "./ClientSlice";
import classNames from "classnames";

function Hall() {
  const {activeSession} = useSelector(state => state.client)
  const {activePlaces} = useSelector(state => state.client)
  const [formatPlaces, setFormatPlaces] = useState([])
  const [place, setPlace] = useState(null)

  const dispatch = useDispatch()
  if(!activeSession) {
    window.location.href = '/'
  }

  useEffect(() => {
    dispatch(getPlacesAsync(activeSession.cinemahall_id))
  }, [activeSession.cinemahall_id])

  useEffect(() => {
    const formattedPlaces  = []
    for(let i = 0; i < activePlaces?.length; i++){
      formattedPlaces[activePlaces[i].row - 1] ?
        formattedPlaces[activePlaces[i].row - 1].push(activePlaces[i]) :
        formattedPlaces[activePlaces[i].row - 1] = [activePlaces[i]]
    }
    setFormatPlaces(formattedPlaces)
  }, [activePlaces?.length, setFormatPlaces, activeSession.cinemahall_id])

  return (
    <div className="App">
      <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
      </header>

      <main>
        <section className="buying">
          <div className="buying__info">
            <div className="buying__info-description">
              <h2 className="buying__info-title">{activeSession?.info}</h2>
              <p className="buying__info-start">Начало сеанса: {activeSession?.time_start?.slice(0, -3)}</p>
              <p className="buying__info-hall">Зал {activeSession?.cinemahall_id}</p>
            </div>
            <div className="buying__info-hint">
              <p>Тапните дважды,<br/>чтобы увеличить</p>
            </div>
          </div>
          <div className="buying-scheme">
            <div className="buying-scheme__wrapper">
              {formatPlaces.map((row, index) => {
                return <div className="buying-scheme__row">
                  {row.map( p => {
                    const classes = classNames({
                      'buying-scheme__chair': true,
                      'buying-scheme__chair_standart': !p.is_vip && !p.is_blocked,
                      'buying-scheme__chair_disabled': p.is_blocked && !p.is_vip,
                      'buying-scheme__chair_vip': p.is_vip && !p.is_blocked,
                      'buying-scheme__chair_selected': index + '_' + p.id === place,
                    })
                    return <span className={classes} onClick={() => {
                      setPlace(index + '_' + p.id)
                      dispatch(buyPlace(p))
                    }}/>
                  })}
                </div>
              })}
            </div>
            <div className="buying-scheme__legend">
              <div className="col">
                <p className="buying-scheme__legend-price"><span
                  className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (<span
                  className="buying-scheme__legend-value">250</span>руб)</p>
                <p className="buying-scheme__legend-price"><span
                  className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span
                  className="buying-scheme__legend-value">350</span>руб)</p>
              </div>
              <div className="col">
                <p className="buying-scheme__legend-price"><span
                  className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                <p className="buying-scheme__legend-price"><span
                  className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>
              </div>
            </div>
          </div>
          <Link to="/payment"><button className="acceptin-button" disabled={!place}>Забронировать</button></Link>
        </section>
      </main>
    </div>
  );
}

export default Hall;
