import { operations } from "../constants";
import { toastMsg, toastMsgConstant } from "../components";
import { isDigit, isDecimal, isOperator } from "./index";

export const defaultValuesCalc = {
  input: "",
  result: "",
  error: "",
  pressedOperatorsList: "",
  units: 0,
};
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
    if (
      currentInput.name === operations.CLEAR ||
      currentInput.name === operations.MINUS
    ) {
      return response;
    }

    // When first input is the operator or decimal or minus or plus then validation is success
    if (
      !previousInputLen &&
      !isDecimalInput &&
      currentInput.name !== operations.ADD
    ) {
      response.success = false;
      response.error = "Invalid format used";
      return response;
    }

    // Validation fails when consecutive different operators(expect) entered
    if (isOperator(lastChar?.toString()) && !isDecimalInput) {
      response.success = false;
      response.error = "Invalid format used";
    }

    // Validation fails when consecutive same operators entered
    if (lastChar?.toString() === currentInput.value?.toString()) {
      response.success = false;
      response.error = "Invalid format used";
    }
  }
  return response;
};

export const getUnitsCount = (calc) => {
  // Return the number of units only when there are additions.
  if (
    calc.pressedOperatorsList ===
    operations.ADD.repeat(calc.pressedOperatorsList.length)
  ) {
    const unitsCount = calc.input.split(operations.ADD).length;
    return calc.input.startsWith(operations.ADD) ? unitsCount - 1 : unitsCount;
  }
};

export const handleAllClear = (newCalc) => {
  newCalc.input = defaultValuesCalc.input;
  newCalc.result = defaultValuesCalc.result;
  newCalc.pressedOperatorsList = defaultValuesCalc.pressedOperatorsList;
  newCalc.units = defaultValuesCalc.units;
  return;
};

export const handleEnter = (calc, previousPressedKey, resultRef) => {
  
  // Throw an error when no inputs provided or enter is pressed right after any operators
  if (!calc.input?.length || isOperator(previousPressedKey)) {
    return toastMsg({
      type: toastMsgConstant.TOAST_ERROR,
      msg: "Invalid format used",
      css: {},
    });
  }
  calc.input = Number(calc.result?.toString().trim());
  resultRef.current.style.fontSize = "2.3rem";
};

export const handleClear = (calc, previousPressedKey, newCalc) => {

  calc.input = calc.input.slice(0, -1);

  // Updating the unit's count when number is removed.
  if (isOperator(previousPressedKey)) {
    calc.pressedOperatorsList = calc.pressedOperatorsList.slice(0, -1);
    newCalc.units = getUnitsCount(calc);
  }
};

export const refactorInput = (currentPressedKey, previousPressedKey, calc) => {

  // prefix 0 when . is pressed as first input or right after any operator
  if (isDecimal(currentPressedKey.value)) {
    if (isOperator(previousPressedKey) || !previousPressedKey) {
      currentPressedKey.value = `0${currentPressedKey.value}`;
    }
  }

  
  if (isOperator(currentPressedKey.value)) {
    calc.pressedOperatorsList =
      calc.pressedOperatorsList + currentPressedKey.value;

    // Example : Previous input = 0. and (any operator) *  is pressed then prefix 0 for the operator i.e 0.0* .
    if (isDecimal(previousPressedKey)) {
      calc.input = calc.input.concat("0");
    }

    if (isOperator(previousPressedKey)) {
      calc.input = calc.input.slice(0, -1);
    }
  }
};

export const hideUnhidenOutputPanel = (lastInputChar, resultRef) => {
  //When lastInput is the operator then hide the result else unhide the result
  resultRef.current.style.display = isOperator(lastInputChar)
    ? "none"
    : "block";
};
