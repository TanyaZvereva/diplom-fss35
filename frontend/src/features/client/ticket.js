import React from 'react';
import Code from '../../i/qr-code.png'
import {useSelector} from "react-redux";


function Ticket() {
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
            <h2 className="ticket__check-title">Электронный билет</h2>
          </header>

          <div className="ticket__info-wrapper">
            <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{activeSession.info}</span>
            </p>
            <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{buyedPlace.row}, {buyedPlace.num}</span></p>
            <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{activeSession.cinemahall_id}</span></p>
            <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{activeSession.time_start?.slice(0, -3)}</span></p>

            <img className="ticket__info-qr" src={Code}/>

              <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
              <p className="ticket__hint">Приятного просмотра!</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Ticket;
