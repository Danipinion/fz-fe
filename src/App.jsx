import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { kelas } from "./constants/Kelas";
import Komunitas from "./pages/Komunitas";
import Menu from "./pages/Menu";
import XTkjI from "./pages/XTkjI";

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
          <Route path="/komunitas" element={<Komunitas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
