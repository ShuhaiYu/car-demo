import { useState,useContext } from 'react';
import CarItem from './CarItem';
import { AuthContext } from '../context/AuthContext';

const CarList = ({ cars }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="flex flex-col w-full my-8">
      {cars.slice(0, visibleCount).map((car) => (
        <CarItem key={car.id} car={car} isAuthenticated={isAuthenticated} />
      ))}
      {visibleCount < cars.length && (
        <button
          onClick={handleLoadMore}
          className="btn bg-blue text-white self-center text-xl"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default CarList;
