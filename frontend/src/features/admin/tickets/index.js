import React, {useState, useEffect} from 'react';
import {editCinemaHallAsync} from "../CinemahallSlice";
import {useSelector, useDispatch} from "react-redux";

function Tickets() {
  const dispatch = useDispatch()
  const {cinemahalls} = useSelector(state => state.cinemahall)
  const [activeHall, setActiveHall] = useState(cinemahalls[0])
  const [price, setPrice] = useState(0)
  const [vipPrice, setVipPrice] = useState(0)

  useEffect(() => {
    setPrice(activeHall.price)
    setVipPrice(activeHall.price_vip)
  }, [activeHall]);


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

      <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
      <div className="conf-step__legend">
        <label className="conf-step__label">Цена, рублей
          <input
            type="text"
            className="conf-step__input"
            placeholder={price}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        за
        <span className="conf-step__chair conf-step__chair_standart"/>обычные кресла
      </div>
      <div className="conf-step__legend">
        <label className="conf-step__label">Цена, рублей
          <input
            type="text"
            className="conf-step__input"
            placeholder={vipPrice}
            value={vipPrice}
            onChange={(e) => setVipPrice(e.target.value)}
          />
        </label>
        за <span className="conf-step__chair conf-step__chair_vip"/> VIP кресла
      </div>

      <fieldset className="conf-step__buttons text-center">
        <button className="conf-step__button conf-step__button-regular">Отмена</button>
        <button
          type="button"
          className="conf-step__button conf-step__button-accent"
          onClick={() => dispatch(editCinemaHallAsync({id: activeHall.id, price, price_vip: vipPrice}))}
        >
          Сохранить
        </button>
      </fieldset>
    </>
  );
}

export default Tickets;