import { Link, useLocation } from "react-router-dom";
import { Logo } from "../Logo/Logo";

export const Header = () => {
  const location = useLocation();

  const isCreate = location.pathname === "/create";
  return (
    <header className="bg-indigo-950 shadow w-full flex justify-between items-center py-4 px-6 lg:px-8">
      <Logo />
      <Link
        to={`${isCreate ? "/" : "/create"}`}
        className="text-white font-semibold bg-green-900 p-1 px-2 rounded-md hover:bg-green-800 transition-all duration-300"
      >
        {isCreate ? "Home" : "Create new hero"}
      </Link>
    </header>
  );
};
