import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import { kelas } from "./constants/Kelas";
import XTkjI from "./pages/XTkjI";
import Komunitas from "./pages/Komunitas";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          {kelas.map((kls) => (
            <Route
              path={kls.link}
              element={<XTkjI kelas={kls.kelas} />}
              key={kls.id}
            />
          ))}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/komunitas" element={<Komunitas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
