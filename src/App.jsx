import Header from "./components/Header";
import "./styles/style.css";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import Card from "./components/Card";
import Detail from "./components/Detail";
import { getRegion } from "./utils/getRegion";

function App() {
  // fetching data from the API and setting up state
  // to store countries and other necessary data
  // using useEffect to fetch data on component mount
  const API_KEY = "rc_live_f437526b20e74c219717530bcc012cc9";

  useEffect(() => {
    document.title = "Country Info App";
    fetch("https://api.restcountries.com/countries/v5?q=all", {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
      .then((response) => {
        console.log("status:", response.status);
        return response.json();
      })
      .then((allCountries) => {
        console.log("raw response:", allCountries);
        if (!allCountries?.data?.objects) {
          console.error("Unexpected response shape:", allCountries);
          return;
        }
        const countryMap = {};
        allCountries.data.objects.forEach((country) => {
          countryMap[country.cca3] = country.names.common;
        });

        const enhancedCountries = allCountries.data.objects.map((country) => ({
          ...country,
          borderNames: country.borders
            ? country.borders.map((code) => countryMap[code] || code)
            : [],
        }));

        setCountries(enhancedCountries);
      });
  }, []);

  // and setting up dark mode, search term, filter, and selected country state
  // using useState for managing state in the functional component
  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Filter countries based on the selected region
  const filteredCountries = countries.filter((country) => {
    const matchesCountryName = country.names.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      filter === "all" || getRegion(country.subregion) === filter;
    return matchesRegion && matchesCountryName;
  });

  return (
    <div data-theme={darkMode} className="bg-background text-text min-h-screen">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      {selectedCountry ? (
        <Detail
          selectedCountry={selectedCountry}
          countries={countries}
          setSelectedCountry={setSelectedCountry}
        />
      ) : (
        <div className="xl:mx-18 w-[90%] mx-auto">
          <div
            className="sm:flex flex-row sm:space-between sm:items-center sm:justify-between mx-auto
           "
          >
            <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            <FilterBar setFilter={setFilter} filter={filter} />
          </div>
          <Card
            filteredCountries={filteredCountries}
            setSelectedCountry={setSelectedCountry}
          />
        </div>
      )}
    </div>
  );
}

export default App;
