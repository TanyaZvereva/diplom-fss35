import {Link} from "react-router-dom";
import {useState} from 'react'
import moment from 'moment'
import classNames from "classnames";

const WEAK = [1, 2, 3, 4, 5, 6, 7];

const TimeLine = () => {
  const [activeDate, setActiveDate] = useState(0)
  const [currentWeak, setCurrentWeak] = useState(WEAK)

  const today = classNames({
    'page-nav__day': true,
    'page-nav__day_today': true,
    'page-nav__day_chosen': activeDate === 0
  });
  return (
    <nav className="page-nav">
      <span className={today} onClick={() => setActiveDate(0)}>
        <span className="page-nav__day-week">
          {moment().format('dd')}
        </span>
        <span className="page-nav__day-number">
          {moment().format('DD')}
        </span>
      </span>

      {currentWeak.map((day) => {
        const date = moment().add(day, 'days')
        const classes = classNames({
          'page-nav__day': true,
          'page-nav__day_chosen': activeDate === day
        });
        return <span key={day} className={classes} onClick={() => setActiveDate(day)}>
        <span className="page-nav__day-week">
          {date.format('dd')}
        </span>
          <span className="page-nav__day-number">
          {date.format('DD')}
        </span>
        </span>
      })}
      <span onClick={() => setCurrentWeak(prev => prev.map(day => day + 1))}><Link
        className="page-nav__day page-nav__day_next" to="#">
      </Link></span>
    </nav>
  )
}


export default TimeLine