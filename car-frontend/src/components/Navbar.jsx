import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setShowLogin,
    setShowRegister,
    showLogin,
    showRegister,
  } = useContext(AuthContext);

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    api
      .post("/logout", { refreshToken })
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // options for the profile dropdown 
  const options = isAuthenticated
    ? [
        {
          label: "Logout",
          action: handleLogout,
        },
      ]
    : [
        {
          label: "Login",
          action: () => setShowLogin(true),
        },
        {
          label: "Register",
          action: () => setShowRegister(true),
        },
      ];

  return (
    <nav className="p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">Car Search</div>
      <div className="relative">
        <Dropdown
          label={<FaUserCircle size={32} className="text-white cursor-pointer" />}
          options={options.map((opt) => opt.label)}
          onChange={(label) => {
            const selectedOption = options.find((opt) => opt.label === label);
            if (selectedOption) selectedOption.action();
          }}
          containerClass="" 
          itemClass="right-0 w-48" 
        />
      </div>
      {showLogin && <LoginModal />}
      {showRegister && <RegisterModal />}
    </nav>
  );
};

export default Navbar;
