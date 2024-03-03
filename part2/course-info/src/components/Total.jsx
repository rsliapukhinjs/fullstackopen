const Total = ({ parts }) => {
  return (
    <p>
      <strong>
        Number of exercises{" "}
        {parts.reduce((total, part) => (total += part.exercises), 0)}
      </strong>
    </p>
  );
};

export default Total;
