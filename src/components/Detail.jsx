import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getRegion } from "../utils/getRegion";

const Detail = ({ selectedCountry, countries, setSelectedCountry }) => {
  const [countryMap, setCountryMap] = useState({});

  // Create the country map when countries data changes
  useEffect(() => {
    const map = {};
    countries.forEach((country) => {
      map[country.names.common.toLowerCase()] = country;
    });
    setCountryMap(map);
  }, [countries]);

  const findCountryOptimized = (countryName) => {
    return countryMap[countryName.toLowerCase()];
  };

  const getBorderCountryNames = (borderCodes) => {
    if (!borderCodes || borderCodes.length === 0) return [];

    return borderCodes.map((code) => {
      const borderCountry = countries.find(
        (country) => country.codes.alpha_3 === code
      );
      return borderCountry ? borderCountry.names.common : code;
    });
  };

  if (!selectedCountry) {
    return (
      <div className="py-10 text-center">
        <p>No country selected</p>
      </div>
    );
  }

  const borderCountryNames = getBorderCountryNames(selectedCountry.borders);

  return (
    <div className="xl:px-16 px-8 ">
      <button
        className=" shadow-md shadow-[rgba(0, 0, 0, 0.822)]  bg-elements   py-[4px] rounded-[5px] flex items-center 
              my-14 cursor-pointer shadow elements-bg 
            px-6 "
        onClick={() => setSelectedCountry(null)}
      >
        <FontAwesomeIcon className="pr-2 " icon={faArrowLeft} />
        Back
      </button>
      <div
        className="flex flex-col md:flex-row items-start md:items-start 
                      space-y-6 md:space-x-6 md:space-y-0  gap-10"
      >
        <img
          src={
            selectedCountry.codes?.alpha_2
              ? `https://flagcdn.com/w640/${selectedCountry.codes.alpha_2.toLowerCase()}.png`
              : "https://via.placeholder.com/320x213"
          }
          alt={`Flag of ${selectedCountry.names?.common || "country"}`}
          className=" w-full max-w-[580px] flex-1 bg-contain  h-auto  shadow-lg"
          width={400}
          height={340}
        />
        <div className="w-full  md:w-2/3 flex flex-col gap-10 flex-1">
          <h2 className="text-2xl fontBoldest ">
            {selectedCountry.names?.common || "Unknown Country"}
          </h2>
          <div className="xl:flex gap-4 justify-between flex-wrap ">
            <div className="">
              <p className="mb-2">
                <strong>Official Name:</strong>{" "}
                {selectedCountry.names?.official || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Population:</strong>{" "}
                {selectedCountry.population?.toLocaleString() || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Region:</strong>{" "}
                {getRegion(selectedCountry.subregion) || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Sub Region:</strong>{" "}
                {selectedCountry.subregion || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Capital:</strong>{" "}
                {selectedCountry.capitals?.[0]?.name || "N/A"}
              </p>
            </div>
            <div className="">
              <p className="mb-2">
                <strong>Top Level Domain:</strong>{" "}
                {selectedCountry.tlds?.[0] || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Currencies:</strong>{" "}
                {selectedCountry.currencies && selectedCountry.currencies.length > 0
                  ? selectedCountry.currencies.map((c) => c.name).join(", ")
                  : "N/A"}
              </p>
              <p className="mb-2">
                <strong>Languages:</strong>{" "}
                {selectedCountry.languages && selectedCountry.languages.length > 0
                  ? selectedCountry.languages.map((l) => l.name).join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className=" mt-6  mb-15">
            <h2 className="fontBold mb-4">Border Countries:</h2>
            {borderCountryNames.length > 0 ? (
              <ul className="flex flex-wrap gap-x-4 gap-y-2 flex-wra ">
                {borderCountryNames.map((borderName, index) => (
                  <li
                    key={index}
                    className="flex  elements-bg cursor-pointer  flex-col"
                  >
                    <button
                      className=" bg-elements shadow cursor-pointer py-1 rounded-md 
                      hover:shadow-lg transition-shadow duration-300 px-4"
                      onClick={() =>
                        setSelectedCountry(findCountryOptimized(borderName))
                      }
                    >
                      {borderName}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No border countries</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;