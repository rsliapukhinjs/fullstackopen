import React from "react";
import Country from "./Country";

const Results = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches</p>;
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <Country country={country} key={country.name.common} />
        ))}
      </div>
    );
  }

  return <Country country={countries[0]} />;
};

export default Results;
