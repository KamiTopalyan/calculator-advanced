import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = (btn: string | number) => {
  switch (btn) {
    case "C":
      return "reset";
    case "/":
    case "x":
    case "-":
    case "+":
      return "operator";
    case "=":
      return "equals";
    default:
      return "";
  }
};

interface ButtonProps {
  value: "." | "C" | "/" | "x" | "-" | "+" | "=" | "%" | "+-" | number;
}

const Button = ({ value }: ButtonProps) => {
  const { calc, setCalc } = useContext(CalcContext);

  // User click .
  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  // User click C
  const resetClick = () => {
    setCalc({ sign: "", num: 0, res: 0 });
  };

  // User click [0,9]
  const handleClickButton = () => {
    const numberString = value.toString();

    let numberValue;
    if (numberString === "0" && calc.num === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  // User click +, -, x, /
  const signClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  // User click =
  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (x: number, y: number, sign: "+" | "-" | "x" | "/") => {
        const result = {
          "+": (x: number, y: number) => x + y,
          "-": (x: number, y: number) => x - y,
          "x": (x: number, y: number) => x * y,
          "/": (x: number, y: number) => x / y,
        };
        return result[sign](x, y);
      };
      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  // User click %
  const persenClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: "",
    });
  };

  // User click +- button
  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const handleBtnClick = () => {
    const results = {
      ".": commaClick,
      "C": resetClick,
      "/": signClick,
      "x": signClick,
      "-": signClick,
      "+": signClick,
      "=": equalsClick,
      "%": persenClick,
      "+-": invertClick,
    };
    
    if (typeof(value) === "number") {
      return handleClickButton();
    } else {
      return results[value]();
    }
  };

  return (
    <button
      onClick={handleBtnClick}
      className={`${getStyleName(value)} button`}
    >
      {value}
    </button>
  );
};

export default Button;
