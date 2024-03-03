import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Header = ({ onGood, onNeutral, onBad }) => {
  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <Button onClick={onGood} text="Good" />
        <Button onClick={onNeutral} text="Neutral" />
        <Button onClick={onBad} text="Bad" />
      </div>
    </div>
  );
};

const StatLine = ({ text, line }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{line}</td>
    </tr>
  );
};

const Stats = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = ((good - bad) / total).toFixed(1);
  const positive = ((good / total) * 100).toFixed(1) + " %";

  if (!total) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatLine text="Good" line={good} />
          <StatLine text="Neutral" line={neutral} />
          <StatLine text="Bad" line={bad} />
          <StatLine text="Total" line={total} />
          <StatLine text="Average" line={average} />
          <StatLine text="Positive" line={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <>
      <Header onGood={handleGood} onNeutral={handleNeutral} onBad={handleBad} />
      <Stats good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
