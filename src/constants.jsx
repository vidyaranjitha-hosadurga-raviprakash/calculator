export const digitsList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const operatorsList = ["+", "-", "*", "/", "%"];

export const operations = {
  ALL_CLEAR: "AC",
  CLEAR: "C",
  PERCENTAGE: "%",
  ADD: "+",
  MINUS: "-",
  MULTIPLY: "*",
  DIVISION: "/",
  DOT: ".",
  ENTER: "=",
};

export const calculatorKeys = [
  { name: operations.ALL_CLEAR, value: "AC" },
  { name: operations.CLEAR, value: "" },
  { name: operations.PERCENTAGE, value: "%" },
  { name: operations.DIVISION, value: "/" },
  { name: 7, value: 7 },
  { name: 8, value: 8 },
  { name: 9, value: 9 },
  { name: operations.MULTIPLY, value: "*" },
  { name: 4, value: 4 },
  { name: 5, value: 5 },
  { name: 6, value: 6 },
  { name: operations.MINUS, value: "-" },
  { name: 1, value: 1 },
  { name: 2, value: 2 },
  { name: 3, value: 3 },
  { name: operations.ADD, value: "+" },
  { name: 0, value: 0 },
  { name: operations.DOT, value: "." },
  { name: operations.ENTER, value: "=" },
];

export const footerProps = {
  footerName: "@prismatic.dreams | 2022",
  typography: {
    color: "text.neutral",
    variant: "subtitle2",
    sx: {
      backgroundColor: "secondary.main",
      borderRadius: "1rem",
      padding: "0.4rem 1rem",
      fontWeight: "fontWeightBold",
    },
  },
};
