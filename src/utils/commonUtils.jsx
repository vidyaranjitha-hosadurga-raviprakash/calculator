import { digitsList, operatorsList } from "../constants";
export const isEmpty = (str) => {
  if (str === undefined) {
    return true;
  }
  return Boolean(str.length);
};

export const isDigit = (value) => {
  return digitsList.includes(value?.toString());
};

export const isOperator = (value) => {
  return operatorsList.includes(value?.toString());
};

export const isDecimal = (value) => {
  return value?.toString().includes(".", "0.");
};
