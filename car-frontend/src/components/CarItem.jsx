import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CarItem = ({ car }) => {
  const { isAuthenticated, setShowLogin } = useContext(AuthContext);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 m-2 w-full border-b border-black">
      <div>
        <h3 className="text-xl font-semibold mb-2">
          {car.maker} {car.model} ({car.year})
        </h3>
        <p className="mb-2">{car.description}</p>
      </div>

      {isAuthenticated ? (
        <p className="text-green-600 font-bold text-left">Price: ${car.price}</p>
      ) : (
        <button
          className="btn bg-blue text-white"
          onClick={handleLoginClick}
        >
          Login to reveal price
        </button>
      )}
    </div>
  );
};

export default CarItem;
