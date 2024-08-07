import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { Button } from "flowbite-react";
import { useAuth } from "../contexts/AuthContext";
import challengeBrand from "../assets/Logo-Eldar-Bl.png";

const Header = () => {
  const { logout, token } = useAuth();

  return (
    <header className="bg-slate-700 shadow-md p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-sm md:text-base lg:text-xl font-bold text-white">
          ELDAR CHALLENGE
        </Link>
        {token && (
          <div className="w-1/3">
            <Button onClick={logout} className="bg-red-500 mx-auto">
              <CiLogout className="mr-2 h-5 w-5 " />
              Logout
            </Button>
          </div>
        )}
        <Link to={"/"}>
          <img src={challengeBrand} alt="Eldar Challenge" className="w-32 " />
        </Link>
      </div>
    </header>
  );
};

export default Header;
