import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Admin from "./features/admin";
import { SignIn } from './features/auth/SignIn';
import Client from './features/client';
import Hall from "./features/client/hall";
import Payment from "./features/client/payment";
import Ticket from "./features/client/ticket";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Client />} />
          <Route path="/hall" element={<Hall />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/ticket" element={<Ticket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
