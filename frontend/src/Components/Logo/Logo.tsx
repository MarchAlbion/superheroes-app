import { useState } from "react";
import {  useNavigate } from "react-router-dom";


export const Logo = () => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className="relative flex items-center cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => navigate("/")}
    >
      <img
        src="/logo.png"
        alt="logo"
        className={`h-8 w-auto absolute top-0 left-0 transition-opacity duration-300 ${
          isHover ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src="logoShield.png"
        alt="logo shield"
        className={`h-8 w-auto absolute top-0 left-0 transition-opacity duration-300 ${
          isHover ? "opacity-100" : "opacity-0"
        }`}
      />
      <span
        className={`text-xl font-bold ml-10 transition-all duration-300  ${
          isHover ? "text-red-500" : "text-white"
        }`}
      >
        Superheroes
      </span>
    </div>
  );
};
