import { operations } from "../constants";

import { isDigit, isDecimal, isOperator } from "./index";
export const validateCalcInputs = (previousInput, currentInput) => {
  const response = {
    success: true,
    error: "",
  };
  const previousInputLen = previousInput.length;
  const isDigitCurrentInput = isDigit(currentInput.value);
  const isDecimalInput = isDecimal(currentInput.value);
  var lastChar = "";
  if (previousInputLen) {
    lastChar = previousInput[previousInputLen - 1];
  }

  // When first input is the operator or repeated operators pressed then  just return
  if (!isDigitCurrentInput) {
    if (currentInput.name === operations.CLEAR) {
      return response;
    }
    if (!previousInputLen && !isDecimalInput) {
      response.success = false;
      return response;
    }

    // Consecutive different operators entered
    if (isOperator(lastChar?.toString())) {
      response.success = false;
      response.error = "Invalid format used";
    }

    // Consecutive same operators entered
    if (lastChar?.toString() === currentInput.value?.toString()) {
      response.success = false;
      response.error = "";
    }
  }
  return response;
};
