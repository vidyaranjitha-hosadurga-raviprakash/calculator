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
};

export const Calculator = React.memo(({ calcKeys }) => {
  const [calc, setCalc] = useState(defaultValuesCalc);
  var resultRef = useRef();
  const compute = (currentPressedKey) => {
    const newCalc = { ...calc };

    if (currentPressedKey.name === operations.ALL_CLEAR) {
      newCalc.input = defaultValuesCalc.input;
      newCalc.result = defaultValuesCalc.result;
      setCalc(newCalc);
      return;
    }
    if (currentPressedKey.name === operations.ENTER) {
      resultRef.current.style.fontSize = "2.5rem";
      calc.input = calc.result ? calc.result.toString() : "";
      return;
    } else {
      resultRef.current.style.fontSize = "1.5rem";
    }

    const calcInputLen = calc.input.length;
    var previousPressedKey = "";
    if (calcInputLen) {
      previousPressedKey = calc.input[calcInputLen - 1];
    }

    if (currentPressedKey.name === operations.CLEAR) {
      calc.input = calc.input.slice(0, -1);
    } else {
      if (isDecimal(currentPressedKey.value)) {
        if (isOperator(previousPressedKey) || !previousPressedKey) {
          // console.log("Calculator: previousPressedKey is operator oder 0 len");
          currentPressedKey.value = "0.";
        }
      }
      if (isOperator(currentPressedKey.value)) {
        if (isDecimal(previousPressedKey)) {
          // console.log(
          //   "Calculator: currentPressedKey is operator and previousPressedKey was decimal so concat 0"
          // );
          calc.input = calc.input.concat("0");
        }
      }
    }

    const { success, error } = validateCalcInputs(
      calc.input,
      currentPressedKey
    );
    // console.log("Calculator : success= ", success);

    if (error?.length) {
      return toastMsg({
        type: toastMsgConstant.TOAST_ERROR,
        msg: error,
        css: {},
      });
    }
    if (success) {
      const updatedInput = calc.input + currentPressedKey.value;
      if (!updatedInput.length) {
        newCalc.input = defaultValuesCalc.input;
        newCalc.result = defaultValuesCalc.result;
      } else {
        const lastInputChar = updatedInput[updatedInput.length - 1];
        newCalc.input = updatedInput;
        const isInputContainOperator = operatorsList.some((i) => {
          return updatedInput.includes(i);
        });

        if (isDigit(lastInputChar) && isInputContainOperator) {
          try {
            const result = eval(updatedInput.toString());
            newCalc.result = result;
          } catch (err) {
            return toastMsg({
              type: toastMsgConstant.TOAST_ERROR,
              msg: err,
              css: {},
            });
          }
        }
        if (isOperator(lastInputChar)) {
          newCalc.result = defaultValuesCalc.result;
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
