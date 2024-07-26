import React from "react";
import { Link } from "react-router-dom";
import { kelas } from "../constants/Kelas";

const Menu = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Menu ARCHIVE</h1>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {kelas.map((kls) => (
          <Link to={kls.link} key={kls.id}>
            <button className="p-3 bg-blue-200 rounded-md w-full h-20">
              {kls.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
