import { useState, useEffect } from "react";
import axios from "axios";

import Search from "./components/Search";
import Results from "./components/Results";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) =>
        setCountries(
          response.data.filter((c) =>
            c.name.common.toLowerCase().includes(country.toLowerCase())
          )
        )
      );
  }, [country]);

  const handleSearch = (e) => {
    setCountry(e.target.value);
  };

  if (!countries) {
    return null;
  }

  return (
    <div>
      <Search country={country} onSearch={handleSearch} />
      <Results countries={countries} />
    </div>
  );
};

export default App;
