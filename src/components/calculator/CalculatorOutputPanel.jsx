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
          width: "19rem",
          paddingRight: "0.5rem",
          textAlign: "right",
          border: "0.01rem white solid",
        }}
      >
        <Grid item sx={{ height: "2rem" }}>
          <Typography variant="h5">{value.input}</Typography>
        </Grid>
        <Grid item sx={{ height: "4rem" }}>
          {value.error.length ? (
            <Typography variant="caption" ref={ref}>
              {value.error}
            </Typography>
          ) : (
            <Typography variant="h5" ref={ref}>
              {value.result}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
});
