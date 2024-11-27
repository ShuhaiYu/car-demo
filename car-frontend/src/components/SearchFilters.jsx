import { useState, useEffect } from "react";
import api from "../api/api";
import Dropdown from "./Dropdown";
import YearRangeDropdown from "./YearRangeDropdown";

const SearchFilters = ({ setCars }) => {
  const [makers, setMakers] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [startYear, setStartYear] = useState(2008);
  const [endYear, setEndYear] = useState(2024);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // get car makers
    api
      .get("/car/makers")
      .then((response) => {
        setMakers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedMaker) {
      // get car models
      api
        .get("/car/models", { params: { maker: selectedMaker } })
        .then((response) => {
          setModels(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setModels([]);
      setSelectedModel("");
    }
  }, [selectedMaker]);

  const handleSearch = () => {
    setLoading(true);
    const params = {};
    if (selectedMaker) params.maker = selectedMaker;
    if (selectedModel) params.model = selectedModel;
    if (startYear) params.startYear = startYear;
    if (endYear) params.endYear = endYear;

    api
      .get("/car", { params })
      .then((response) => {
        setCars(response.data);

        // update document title
        let newTitle = "How Much They Sold In Australia";
        if (selectedMaker) newTitle = `${selectedMaker}`;
        if (selectedModel) newTitle += ` ${selectedModel}`;
        document.title = `${newTitle} | How Much They Sold In Australia`;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        console.log("Search complete:", params);
      });
  };

  const handleClear = () => {
    setSelectedMaker("");
    setSelectedModel("");
    setStartYear(2008);
    setEndYear(2024);
    setCars([]);
  };

  const handleYearChange = (type, value) => {
    if (type === "startYear") setStartYear(value);
    if (type === "endYear") setEndYear(value);
  };

  return (
    <div className="flex flex-col bg-gray-300 rounded-3xl p-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center my-4">
        <Dropdown
          label="Select Maker"
          options={makers}
          selected={selectedMaker}
          onChange={setSelectedMaker}
          containerClass={"btn border-black"}
          itemClass={"w-full"}

        />
        <Dropdown
          label="Select Model"
          options={models}
          selected={selectedModel}
          onChange={setSelectedModel}
          containerClass={"btn border-black"}
          itemClass={"w-full"}

        />
        <YearRangeDropdown
          startYear={startYear}
          endYear={endYear}
          onYearChange={handleYearChange}
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:gap-8 justify-center md:justify-end">
        <button
          onClick={handleSearch}
          className="btn bg-black text-white"
          disabled={loading}
        >
          {loading ? "Searching..." : "Apply"}
        </button>
        <button
          onClick={handleClear}
          className="btn border-black text-black"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
