import React from "react";
import { getRegion } from "../utils/getRegion";

const Card = ({ filteredCountries, setSelectedCountry }) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-14 gap-4
                    md:w-full  mx-auto md:mx-0 "
    >
      {filteredCountries.map((country, index) => (
        <div
          key={index}
          className="elements-bg  rounded-md shadow-md flex flex-col justify-between 
        hover:shadow-lg transition-shadow  cursor-pointer translate-y-0 
        hover:-translate-y-1  "
          onClick={() => setSelectedCountry(country)}
        >
          <div className="h-48 w-full overflow-hidden rounded-t-md shadow-lg">
            <img
              src={`https://flagcdn.com/w320/${country.codes.alpha_2.toLowerCase()}.png`}
              alt={country.names.common}
              className="w-full h-full object-cover bg-center"
            />
          </div>

          <div className=" px-6 pb-8 pt-4  ">
            <h2 className="fontBoldest pb-4  text-lg">
              {country.names.common}
            </h2>
            <p className="fontBold">
              Population:{" "}
              <span className="fontRegular">
                {country.population.toLocaleString()}
              </span>
            </p>
            <p className="fontBold">
              Region:{" "} {country.region}
             
            </p>
            <p className="fontBold pb-2">
              Capital: <span className="fontRegular">{country.capitals[0].name}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
