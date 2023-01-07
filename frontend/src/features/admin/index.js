import React from 'react';
import CinemaHall from './cinemahall'
import Places from './places'
import Tickets from './tickets'
import Seasons from './seasons'
import LaunchSell from './launchSell'
import Dropdown from '../../components/Dropdown'

function Admin() {
  return (
    <div className="App">
      <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        <span className="page-header__subtitle">Администраторррская</span>
      </header>

      <Dropdown>
        {[
          {title: "Управление залами", component: <CinemaHall/>},
          {title: "Конфигурация залов", component: <Places/>},
          {title: "Конфигурация цен", component: <Tickets/>},
          {title: "Сетка сеансов", component: <Seasons/>},
          {title: "Открыть продажи", component: <LaunchSell/>},
        ]}
      </Dropdown>
    </div>
  );
}

export default Admin;
