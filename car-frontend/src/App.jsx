import { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import SearchFilters from "./components/SearchFilters";
import CarList from "./components/CarList";
import { AuthContext } from "./context/AuthContext";
import api from "./api/api";

const App = () => {
  const [cars, setCars] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/car")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch cars after login:", error);
      });
  }, [isAuthenticated]);

  return (
    <>
      <div className="p-8 min-h-1/2 bg-secondary">
        <Navbar />

        <SearchFilters setCars={setCars} />
      </div>
      <div className="min-h-screen">
        <CarList cars={cars} />
      </div>
    </>
  );
};

export default App;
