import React, { useState, useRef } from "react";
import { Stack } from "@mui/material";
import { CalculatorInputsPanel, CalculatorOutputPanel } from "./";
import { operations, operatorsList } from "../../constants";
import { toastMsg, toastMsgConstant } from "../../components";

import {
  isDigit,
  isOperator,
  isDecimal,
  validateCalcInputs,
} from "../../utils";
const defaultValuesCalc = {
  input: "",
  result: "",
  error: "",
  pressedOperatorsList: "",
  units: 0,
};

const getUnitsCount = (calc) => {
  // Return the number of units only when there are additions.
  if (
    calc.pressedOperatorsList ===
    operations.ADD.repeat(calc.pressedOperatorsList.length)
  ) {
    const unitsCount = calc.input.split(operations.ADD).length;
    return calc.input.startsWith(operations.ADD) ? unitsCount - 1 : unitsCount;
  }
};

const doAllClear = (newCalc) => {
  newCalc.input = defaultValuesCalc.input;
  newCalc.result = defaultValuesCalc.result;
  newCalc.pressedOperatorsList = defaultValuesCalc.pressedOperatorsList;
  newCalc.units = defaultValuesCalc.units;
  return;
};

const doOnEnterOperations = (calc, previousPressedKey, resultRef) => {
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

const doClear = (calc, previousPressedKey, newCalc) => {
  console.log("Calculator: doClear");
  calc.input = calc.input.slice(0, -1);

  // Updating the unit's count when number is removed.
  if (isOperator(previousPressedKey)) {
    calc.pressedOperatorsList = calc.pressedOperatorsList.slice(0, -1);
    newCalc.units = getUnitsCount(calc);
  }
};

const doRefactorInput = (currentPressedKey, previousPressedKey, calc) => {
  if (isDecimal(currentPressedKey.value)) {
    if (isOperator(previousPressedKey) || !previousPressedKey) {
      currentPressedKey.value = "0.";
    }
  }
  if (isOperator(currentPressedKey.value)) {
    calc.pressedOperatorsList =
      calc.pressedOperatorsList + currentPressedKey.value;
    if (isDecimal(previousPressedKey)) {
      calc.input = calc.input.concat("0");
    }

    if (isOperator(previousPressedKey)) {
      calc.input = calc.input.slice(0, -1);
    }
  }
};

const hideUnhidenOutputPanel = (lastInputChar, resultRef) => {
  //When lastInput is the operator then hide the result else unhide the result
  resultRef.current.style.display = isOperator(lastInputChar)
    ? "none"
    : "block";
};
export const Calculator = React.memo(({ calcKeys }) => {
  const [calc, setCalc] = useState(defaultValuesCalc);
  var resultRef = useRef();

  const compute = (currentPressedKey) => {
    const newCalc = { ...calc };
    const calcInputLen = calc.input.length;
    var previousPressedKey = calcInputLen ? calc.input.at(-1) : "";

    switch (currentPressedKey?.name) {
      case operations.ALL_CLEAR:
        doAllClear(newCalc);
        setCalc(newCalc);
        return;
      case operations.ENTER:
        doOnEnterOperations(calc, previousPressedKey, resultRef);
        return;
      case operations.CLEAR:
        console.log("Clearing one at a time");
        doClear(calc, previousPressedKey, newCalc);
        break;
      default:
        resultRef.current.style.fontSize = "1.7rem";
        doRefactorInput(currentPressedKey, previousPressedKey, calc);
    }

    const { success, error } = validateCalcInputs(
      calc.input,
      currentPressedKey
    );
    // console.log(
    //   "Calculator : success= ",
    //   success,
    //   "error= ",
    //   error,

    //   "and calc = ",
    //   calc,
    //   "previousPressedKey = ",
    //   previousPressedKey
    // );

    if (!success && error?.length) {
      console.log("Calculator: error = ", error);
      // Preserve the -/+ sign when it is the first character.
      if (
        previousPressedKey === operations.MINUS ||
        previousPressedKey === operations.ADD
      ) {
        newCalc.input = previousPressedKey;
        setCalc(newCalc);
      }
      return toastMsg({
        type: toastMsgConstant.TOAST_ERROR,
        msg: error,
        css: {},
      });
    }

    const updatedInput = `${calc.input}${currentPressedKey.value}`.trim();
    newCalc.pressedOperatorsList = calc.pressedOperatorsList;
    if (!updatedInput.length) {
      doAllClear(newCalc);
    } else {
      const lastInputChar = updatedInput.at(-1);
      newCalc.input = updatedInput;
      const isInputContainOperator = operatorsList.some((i) =>
        updatedInput.includes(i)
      );

      if (isDigit(lastInputChar) && isInputContainOperator) {
        try {
          const result = eval(updatedInput.toString());
          newCalc.result = result.toFixed(3);
          newCalc.units = getUnitsCount(calc);
        } catch (err) {
          return toastMsg({
            type: toastMsgConstant.TOAST_ERROR,
            msg: err,
            css: {},
          });
        }
      }

      hideUnhidenOutputPanel(lastInputChar, resultRef);
    }
    console.log("Calculator: updating the calc , newCalc = ", newCalc);
    setCalc(newCalc);
  };

  return (
    <Stack
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "background.default",
        width: "19rem",
        minHeight: "20rem",
        padding: "2rem 2rem",
        margin: "2rem 2rem",
        borderRadius: "3rem",
      }}
    >
      <CalculatorOutputPanel value={calc} ref={resultRef} />
      <CalculatorInputsPanel calcKeys={calcKeys} clickHandler={compute} />
    </Stack>
  );
});
