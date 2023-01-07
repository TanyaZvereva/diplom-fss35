import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function Payment() {
  const {activeSession} = useSelector(state => state.client)
  const {buyedPlace} = useSelector(state => state.client)

  if(!activeSession || !buyedPlace) {
    window.location.href = '/'
  }

  return (
    <div className="App">
      <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
      </header>

      <main>
        <section className="ticket">

          <header className="tichet__check">
            <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
          </header>

          <div className="ticket__info-wrapper">
            <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{activeSession.info}</span>
            </p>
            <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{buyedPlace.row}, {buyedPlace.num}</span></p>
            <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{activeSession.cinemahall_id}</span></p>
            <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{activeSession.time_start?.slice(0, -3)}</span></p>
            <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">600</span> рублей</p>

            <Link to="/ticket">
              <button className="acceptin-button">Получить код бронирования</button>
            </Link>

            <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту.
              Покажите QR-код нашему контроллёру у входа в зал.</p>
            <p className="ticket__hint">Приятного просмотра!</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Payment;
