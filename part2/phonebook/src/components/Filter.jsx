import React from "react";

const Filter = ({ filter, onFilter }) => {
  return (
    <div>
      Filter by: <input type="text" value={filter} onChange={onFilter} />
    </div>
  );
};

export default Filter;
