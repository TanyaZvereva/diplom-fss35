import React, {useEffect, useState} from 'react';
import {createCinemaHallAsync, getCinemaHallAsync, removeCinemaHallAsync} from '../CinemahallSlice'
import {useDispatch, useSelector} from "react-redux";
import Modal from '../../../components/Modal'

function CinemaHall() {
  const dispatch = useDispatch()
  const {cinemahalls} = useSelector(state => state.cinemahall)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rows, setRows] = useState(0)
  const [places, setPlaces] = useState(0)

  useEffect(() => {
    dispatch(getCinemaHallAsync())
  }, [])

  return (
    <>
      <p className="conf-step__paragraph">Доступные залы:</p>
      <ul className="conf-step__list">
        {cinemahalls.map((hall) => <li key={hall.id}>Зал {hall.id} Мест: {hall.count_x} на {hall.count_y}
            <button className="conf-step__button conf-step__button-trash" onClick={() => dispatch(removeCinemaHallAsync({id: hall.id, callback: () => {
                dispatch(getCinemaHallAsync())
                setIsModalOpen(false)
              }}))}/>
          </li>
        )}
      </ul>
      <button className="conf-step__button conf-step__button-accent" onClick={() => setIsModalOpen(true)}>Создать зал</button>
      {isModalOpen && <Modal setIsOpen={setIsModalOpen} title="Добавление зала">
        <form onSubmit={(e) => {
          e.preventDefault()
          dispatch(createCinemaHallAsync({
            count_x: rows,
            count_y: places,
            callback: () => {
              dispatch(getCinemaHallAsync())
              setIsModalOpen(false)
            }}))
        }}>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="rows">
            Кол-во рядов
            <input
              className="conf-step__inputв"
              type="text"
              placeholder="Кол - во"
              id="rows"
              required
              value={rows}
              onChange={(e) => setRows(Number(e.currentTarget.value))}
            />
          </label>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="places">
            Кол-во мест в ряде
            <input
              className="conf-step__inputв"
              type="text"
              placeholder="Кол - во"
              id="places"
              required
              value={places}
              onChange={(e) => setPlaces(Number(e.currentTarget.value))}
            />
          </label>
          <div className="conf-step__buttons text-center">
            <input type="submit" value="Добавить зал" className="conf-step__button conf-step__button-accent"/>
              <button className="conf-step__button conf-step__button-regular" onClick={() => setIsModalOpen(false)}>Отменить</button>
          </div>
        </form>
      </Modal>}
    </>
  );
}

export default CinemaHall;
