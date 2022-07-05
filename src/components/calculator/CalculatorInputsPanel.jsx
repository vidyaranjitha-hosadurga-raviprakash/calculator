import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { isDecimal, isDigit } from "../../utils/";
import { operations } from "../../constants";

const getInputsColor = (keyName) => {
  var colors = {
    inputKeyColor: "text.secondary",
    buttonColor: "primary",
  };
  if (isDigit(keyName) || isDecimal(keyName) || keyName === operations.ENTER) {
    colors.inputKeyColor = "text.primary";
    if (keyName === operations.ENTER) {
      colors.buttonColor = "secondary";
    }
  }
  return colors;
};

export const CalculatorInputsPanel = ({ calcKeys, clickHandler }) => {
  const keyButtonItem = (calcKey, index) => {
    const { inputKeyColor, buttonColor } = getInputsColor(calcKey.value);
    return (
      <Grid item xs={3} sm={3} md={3} key={index} lg={3}>
        <Button
          color={buttonColor}
          variant="contained"
          onClick={() => clickHandler(calcKey)}
          sx={{ width: index === calcKeys.length - 1 ? "9rem" : "" }}
        >
          <Typography color={inputKeyColor}>{calcKey.name}</Typography>
        </Button>
      </Grid>
    );
  };

  return (
    <Grid
      container
      sx={{ width: "20rem", paddingLeft: "0.5rem" }}
      columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
      rowSpacing={2}
    >
      {calcKeys.map((calcKey, index) => {
        return keyButtonItem(calcKey, index);
      })}
    </Grid>
  );
};
