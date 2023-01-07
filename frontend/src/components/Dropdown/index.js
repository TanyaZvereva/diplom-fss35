import React, { useState } from 'react';

function Dropdown({children}) {
  const [activeTabs, setActiveTab] = useState([children[0].title])
  const handleDropDown = (clickedItem) => () => {
    setActiveTab(prev => {
      if(prev.includes(clickedItem)) {
        return prev.filter(f => f !== clickedItem)
      } else {
        return [...prev, clickedItem]
      }
    })
  }

  return (
    <main className="conf-steps">
      {children.map((item, key) => <section key={item.title + key} className="conf-step">
        <header
          className={activeTabs.includes(item.title) ? "conf-step__header conf-step__header_opened" : "conf-step__header conf-step__header_closed"}
          onClick={handleDropDown(item.title)}
        >
          <h2 className="conf-step__title">{item.title}</h2>
        </header>
        {activeTabs.includes(item.title) && <div className="conf-step__wrapper">
          {item.component}
        </div>}
      </section>)}
    </main>
  );
}

export default Dropdown