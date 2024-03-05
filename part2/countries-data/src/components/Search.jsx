import React from "react";

const Search = ({ country, onSearch }) => {
  return (
    <div>
      <label htmlFor="country">Find countries: </label>
      <input type="text" value={country} onChange={onSearch} />
    </div>
  );
};

export default Search;
