import ReactDOM from "react-dom";
import {useEffect} from "react";
import CloseImg from "../../i/close.png"
const modalPortal = document.querySelector('#modal')
const modal = document.createElement('div')

const Modal = ({children, setIsOpen, title}) => {

  useEffect(() => {
    modalPortal.append(modal)

    return () => {
      modal.remove()
    }
  }, [])

  return (
    ReactDOM.createPortal(
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              {title}
              <a className="popup__dismiss" href="#">
                <img src={CloseImg} onClick={() => setIsOpen(false)} alt="Закрыть"/>
              </a>
            </h2>

          </div>
          <div className="popup__wrapper">
            {children}
          </div>
        </div>
      </div>,
      modal
    )
  )
}


export default Modal