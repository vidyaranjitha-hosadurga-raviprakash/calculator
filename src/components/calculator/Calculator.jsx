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

export const Calculator = React.memo(({ calcKeys }) => {
  const [calc, setCalc] = useState(defaultValuesCalc);
  var resultRef = useRef();
  // console.log("Calculator: calc = ", calc);
  const getUnits = () => {
    // Return the number of units only when there are additions.
    if (
      calc.pressedOperatorsList === "+".repeat(calc.pressedOperatorsList.length)
    ) {
      const unitsCount = calc.input.split("+").length;
      return calc.input.startsWith("+") ? unitsCount - 1 : unitsCount;
    }
  };
  const compute = (currentPressedKey) => {
    const newCalc = { ...calc };
    if (currentPressedKey.name === operations.ALL_CLEAR) {
      newCalc.input = defaultValuesCalc.input;
      newCalc.result = defaultValuesCalc.result;
      newCalc.pressedOperatorsList = defaultValuesCalc.pressedOperatorsList;
      newCalc.units = defaultValuesCalc.units;
      setCalc(newCalc);
      return;
    }

    const calcInputLen = calc.input.length;
    var previousPressedKey = "";
    if (calcInputLen) {
      previousPressedKey = calc.input.at(-1);
    }

    if (currentPressedKey.name === operations.ENTER) {
      // Throw an error when no inputs provided or enter is pressed right after any operators
      if (!calc.input?.length || isOperator(previousPressedKey)) {
        return toastMsg({
          type: toastMsgConstant.TOAST_ERROR,
          msg: "Invalid format used",
          css: {},
        });
      }
      resultRef.current.style.fontSize = "2.3rem";
      calc.input = Number(calc.result?.toString().trim());
      return;
    } else {
      resultRef.current.style.fontSize = "1.7rem";
    }

    if (currentPressedKey.name === operations.CLEAR) {
      calc.input = calc.input.slice(0, -1);

      // Updating the operators
      if (isOperator(previousPressedKey)) {
        calc.pressedOperatorsList = calc.pressedOperatorsList.slice(0, -1);
        newCalc.units = getUnits();
      }
    } else {
      if (isDecimal(currentPressedKey.value)) {
        if (isOperator(previousPressedKey) || !previousPressedKey) {
          currentPressedKey.value = "0.";
        }
      }
      if (isOperator(currentPressedKey.value)) {
        calc.pressedOperatorsList =
          calc.pressedOperatorsList + currentPressedKey.value;
        if (isDecimal(previousPressedKey)) {
          // console.log(
          //   "Calculator: currentPressedKey is operator and previousPressedKey was decimal so concat 0"
          // );
          calc.input = calc.input.concat("0");
        }

        if (isOperator(previousPressedKey)) {
          // console.log("Stripping");
          calc.input = calc.input.slice(0, -1);
        }
      }
    }

    const { success, error } = validateCalcInputs(
      calc.input,
      currentPressedKey
    );
    // console.log(
    //   "Calculator : success= ",
    //   success,
    //   "and calc = ",
    //   calc,
    //   "previousPressedKey = ",
    //   previousPressedKey
    // );

    if (error?.length) {
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
    if (success) {
      const updatedInput = `${calc.input}${currentPressedKey.value}`.trim();
      newCalc.pressedOperatorsList = calc.pressedOperatorsList;
      if (!updatedInput.length) {
        newCalc.input = defaultValuesCalc.input;
        newCalc.result = defaultValuesCalc.result;
        newCalc.pressedOperatorsList = defaultValuesCalc.pressedOperatorsList;
        newCalc.units = defaultValuesCalc.units;
      } else {
        const lastInputChar = updatedInput.at(-1);
        newCalc.input = updatedInput;
        const isInputContainOperator = operatorsList.some((i) => {
          return updatedInput.includes(i);
        });

        if (isDigit(lastInputChar) && isInputContainOperator) {
          try {
            const result = eval(updatedInput.toString());
            newCalc.result = result.toFixed(3);
            newCalc.units = getUnits();
          } catch (err) {
            return toastMsg({
              type: toastMsgConstant.TOAST_ERROR,
              msg: err,
              css: {},
            });
          }
        }

        //When lastInput is the operator then hide the result else unhide the result
        if (isOperator(lastInputChar)) {
          resultRef.current.style.display = "none";
        } else {
          resultRef.current.style.display = "";
        }
      }
      // console.log("Calculator: updating the calc , newCalc = ", newCalc);
      setCalc(newCalc);
    }
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
