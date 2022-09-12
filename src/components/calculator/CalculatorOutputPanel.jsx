import React from "react";
import { Grid, Typography } from "@mui/material";

export const CalculatorOutputPanel = React.forwardRef(({ value }, ref) => {
  return (
    <>
      {/* Display the units */}
      <span
        style={{
          height: "0rem",
          marginLeft: "15rem",
        }}
      >
        <Typography variant="caption">
          {value.units
            ? `${value.units} ${value.units > 1 ? "units" : "unit"}`
            : ""}
        </Typography>
      </span>
      <Grid
        container
        direction="column"
        spacing={1}
        sx={{
          overflowWrap: "break-word",
          textAlign: "right",
          border: "0.01rem white solid",
          minHeight: "7rem",
        }}
      >
        <Grid
          item
          sx={{
            minHeight: "2rem",
            width: "19rem",
            padding: "0rem 0.5rem 0rem 1rem",
          }}
        >
          <Typography variant="h6">{value.input}</Typography>
        </Grid>
        <Grid
          item
          sx={{
            width: "19rem",
            minHeight: "4rem",
            padding: "0rem 0.5rem 0rem 1rem",
          }}
        >
          {value.error.length ? (
            <Typography variant="caption" ref={ref}>
              {value.error}
            </Typography>
          ) : (
            <Typography variant="h6" ref={ref}>
              {value.result?.length ? Number(value.result) : value.result}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
});
