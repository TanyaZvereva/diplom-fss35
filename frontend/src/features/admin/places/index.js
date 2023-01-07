import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPlacesAsync, updatePlacesAsync} from '../CinemahallSlice'
import classNames from 'classnames'
import {flatten} from "lodash";

function Places() {
  const dispatch = useDispatch()
  const {cinemahalls, places, isLoading} = useSelector(state => state.cinemahall)
  const [activeHall, setActiveHall] = useState(cinemahalls[0])
  const [formatPlaces, setFormatPlaces] = useState([])
  console.log(activeHall.id)
  useEffect(() => {
    dispatch(getPlacesAsync(activeHall.id))
  }, [activeHall.id])

  useEffect(() => {
    const formattedPlaces  = []
    for(let i = 0; i < places?.length; i++){
      formattedPlaces[places[i].row - 1] ?
        formattedPlaces[places[i].row - 1].push(places[i]) :
        formattedPlaces[places[i].row - 1] = [places[i]]
    }
    setFormatPlaces(formattedPlaces)
  }, [places?.length, setFormatPlaces, places[0]?.hall_id])

  // if(isLoading){
  //   return 'Подождите загрузку ...'
  // }

  return (
    <>
      <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
      <ul className="conf-step__selectors-box">
        {cinemahalls.map(hall => {
          return <li>
            <input
              type="radio"
              className="conf-step__radio"
              name="chairs-hall"
              value={"Зал" + hall.id}
              checked={hall.id === activeHall.id}
              onChange={() => setActiveHall(hall)}
            />
            <span className="conf-step__selector">Зал {hall.id}</span></li>
        })}
      </ul>
      {/*<p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>*/}
      {/*<div className="conf-step__legend">*/}
      {/*  <label className="conf-step__label">*/}
      {/*    Рядов, шт*/}
      {/*    <input type="text" className="conf-step__input" placeholder={activeHall.count_x}/>*/}
      {/*  </label>*/}
      {/*  <span className="multiplier">x</span>*/}
      {/*  <label*/}
      {/*    className="conf-step__label">*/}
      {/*    Мест, шт*/}
      {/*    <input type="text" className="conf-step__input" placeholder={activeHall.count_y}/>*/}
      {/*  </label>*/}
      {/*</div>*/}
      <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
      <div className="conf-step__legend">
        <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
        <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
        <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
        <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
      </div>

      <div className="conf-step__hall">
        <div className="conf-step__hall-wrapper">

          {formatPlaces.map(row => {
            return <div className="conf-step__row">
              {row.map( p => {
                const classes = classNames({
                  'conf-step__chair': true,
                  'conf-step__chair_standart': !p.is_vip && !p.is_blocked,
                  'conf-step__chair_disabled': p.is_blocked && !p.is_vip,
                  'conf-step__chair_vip': p.is_vip && !p.is_blocked,
                })
                return <span className={classes} onClick={() => setFormatPlaces(prev => {
                  return prev.map(r => {
                    return r.map(item => {
                      if(p.id === item.id){
                        if(!p.is_vip && !p.is_blocked) {
                          return {...item, is_vip: true}
                        }
                        if(p.is_vip && !p.is_blocked) {
                          return {...item, is_vip: false, is_blocked: true}
                        }
                        if(p.is_blocked && !p.is_vip) {
                          return {...item, is_blocked: false}
                        }
                      }
                      return item
                    })
                  })
                })}/>
              })}
            </div>
          })}
        </div>
      </div>

      <fieldset className="conf-step__buttons text-center">
        {/*<button className="conf-step__button conf-step__button-regular" >Отмена</button>*/}
        <button
          className="conf-step__button conf-step__button-accent"
          onClick={() => {
            dispatch(updatePlacesAsync(flatten(formatPlaces)))
          }}
        >
          Сохранить
        </button>
      </fieldset>
    </>
  );
}

export default Places;