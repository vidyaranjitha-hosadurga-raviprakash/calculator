import React, { useState, useRef } from "react";
import { Stack } from "@mui/material";
import { CalculatorInputsPanel, CalculatorOutputPanel } from "./";
import { operations, operatorsList } from "../../constants";
import { toast } from "react-toastify";
import {
  defaultValuesCalc,
  isDigit,
  validateCalcInputs,
  handleAllClear,
  handleEnter,
  handleClear,
  refactorInput,
  hideUnhidenOutputPanel,
  getUnitsCount,
} from "../../utils";

export const Calculator = React.memo(({ calcKeys }) => {
  const [calc, setCalc] = useState(defaultValuesCalc);
  var resultRef = useRef();

  const compute = (currentPressedKey) => {
    const newCalc = { ...calc };
    const calcInputLen = calc.input.length;
    var previousPressedKey = calcInputLen ? calc.input.at(-1) : "";

    // 1. Handling the non-operator keys
    switch (currentPressedKey?.name) {
      case operations.ALL_CLEAR: {
        handleAllClear(newCalc);
        setCalc(newCalc);
        return;
      }
      case operations.ENTER: {
        handleEnter(calc, previousPressedKey, resultRef);
        return;
      }
      case operations.CLEAR: {
        handleClear(calc, previousPressedKey, newCalc);
        break;
      }
      default: {
        resultRef.current.style.fontSize = "1.7rem";
        refactorInput(currentPressedKey, previousPressedKey, calc);
      }
    }

    // 2. Validation of the input
    const { success, error } = validateCalcInputs(
      calc.input,
      currentPressedKey
    );

    if (!success && error?.length) {
      // Preserve the -/+ sign when it is the first character.
      if (
        previousPressedKey === operations.MINUS ||
        previousPressedKey === operations.ADD
      ) {
        newCalc.input = previousPressedKey;
        setCalc(newCalc);
      }
      return toast.error(error);
    }

    const updatedInput = `${calc.input}${currentPressedKey.value}`.trim();
    newCalc.pressedOperatorsList = calc.pressedOperatorsList;
    if (!updatedInput.length) {
      handleAllClear(newCalc);
    } else {
      newCalc.input = updatedInput;
      const lastInputChar = updatedInput.at(-1);

      // Used to determine whether should be evaluated or not.
      const isInputContainOperator = operatorsList.some((i) =>
        updatedInput.includes(i)
      );

      //3.  Evaluate the expression when last input is digit and inputs at given time contain the any operator and .
      if (isDigit(lastInputChar) && isInputContainOperator) {
        try {
          const result = eval(updatedInput.toString());
          newCalc.result = result.toFixed(3);
          newCalc.units = getUnitsCount(calc);
        } catch (err) {
          toast.error(err);
        }
      }

      hideUnhidenOutputPanel(lastInputChar, resultRef);
    }
    // console.log("Calculator: updating the calc , newCalc = ", newCalc);
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
