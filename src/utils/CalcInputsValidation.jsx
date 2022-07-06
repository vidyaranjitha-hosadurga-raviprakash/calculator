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
    lastChar = previousInput.at(-1);
  }

  // When entered key is not digit i.e operators or dot or AC or C or =
  if (!isDigitCurrentInput) {
    console.log(
      "validate : lastChar = ",
      lastChar,
      " isDecimalInput = ",
      isDecimalInput,
      " currentInput = ",
      currentInput.value
    );
    if (
      currentInput.name === operations.CLEAR ||
      (currentInput.name === operations.MINUS &&
        !isOperator(lastChar?.toString()))
    ) {
      return response;
    }

    // When first input is the operator or minus then validation is success
    if (!previousInputLen && !isDecimalInput) {
      response.success = false;
      return response;
    }

    // Validation fails when consecutive different operators(expect) entered
    if (isOperator(lastChar?.toString()) && !isDecimalInput) {
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
