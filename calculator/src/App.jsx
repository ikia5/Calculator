import { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [isEvaluated, setIsEvaluated] = useState(false);

  const MAX_INPUT_LENGTH = 17;

  const handleClick = (value) => {
    if (value === "=") {
      try {
        setInput(eval(input).toString());
        setIsEvaluated(true);
      } catch {
        setInput("Syntax Error");
        setIsEvaluated(false);
      }
    } else if (value === "C") {
      setInput("");
      setIsEvaluated(false);
    } else if (value === "Back") {
      if (input === "Syntax Error") {
        setInput("0");
      } else {
        setInput((prevInput) => prevInput.slice(0, -1));
        setIsEvaluated(false);
      }
    } else if (value === "π") {
      if (/\d$/.test(input)) {
        setInput((prevInput) => prevInput + "*" + 3.14);
      } else {
        setInput((prevInput) => prevInput + 3.14);
      }
      setIsEvaluated(false);
    } else if (value === "x²") {
      try {
        setInput((prevInput) => Math.pow(eval(prevInput), 2).toString());
        setIsEvaluated(true);
      } catch {
        setInput("Syntax Error");
        setIsEvaluated(false);
      }
    } else if (value === "√") {
      try {
        setInput((prevInput) => Math.sqrt(eval(prevInput)).toString());
        setIsEvaluated(true);
      } catch {
        setInput("Syntax Error");
        setIsEvaluated(false);
      }
    } else {
      setInput((prevInput) => {
        if (input === "Syntax Error" && !isNaN(value)) {
          return value;
        }

        if (prevInput.length < MAX_INPUT_LENGTH) {
          if (isEvaluated && !isNaN(value)) {
            return value;
          }
          return prevInput + value;
        }

        return prevInput;
      });
      setIsEvaluated(false);
    }
  };

  const displayValue = input.replace(/\*/g, "x").replace(/\//g, "÷");

  return (
    <div className="app">
      <div className="calculator">
        <div className="display">
          {displayValue || "0"}
        </div>
        <div className="buttons">
          {["7", "8", "9"].map((btn) => (
            <button key={btn} onClick={() => handleClick(btn)}>
              {btn}
            </button>
          ))}
          <button onClick={() => handleClick("C")}>C</button>
        </div>
        <div className="buttons">
          {["4", "5", "6", "/"].map((btn) => (
            <button key={btn} onClick={() => handleClick(btn)}>
              {btn === "/" ? "÷" : btn}
            </button>
          ))}
        </div>
        <div className="buttons">
          {["1", "2", "3", "*"].map((btn) => (
            <button key={btn} onClick={() => handleClick(btn)}>
              {btn === "*" ? "x" : btn}
            </button>
          ))}
        </div>
        <div className="buttons">
          {["+", "0", "-", "="].map((btn) => (
            <button key={btn} onClick={() => handleClick(btn)}>
              {btn}
            </button>
          ))}
        </div>
        <div className="buttons">
          <button className="back-btn" onClick={() => handleClick("Back")}>
            ←
          </button>
          <button className="pi-btn" onClick={() => handleClick("π")}>
            π
          </button>
          <button className="square-btn" onClick={() => handleClick("x²")}>
            x²
          </button>
          <button className="sqrt-btn" onClick={() => handleClick("√")}>
            √
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
