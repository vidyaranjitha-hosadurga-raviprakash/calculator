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

  if (!isDigitCurrentInput) {
    // When first input is the operator or minus then validation is success
    if (
      currentInput.name === operations.CLEAR ||
      currentInput.name === operations.MINUS
    ) {
      return response;
    }
    if (!previousInputLen && !isDecimalInput) {
      response.success = false;
      return response;
    }

    // Validation fails when consecutive different operators entered
    if (isOperator(lastChar?.toString())) {
      response.success = false;
      response.error = "Invalid format used";
    }

    // Validation faile when consecutive same operators entered
    if (lastChar?.toString() === currentInput.value?.toString()) {
      response.success = false;
      response.error = "";
    }
  }
  return response;
};
