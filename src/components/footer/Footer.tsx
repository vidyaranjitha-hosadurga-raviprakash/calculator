import React from "react";
import { Box, Typography } from "@mui/material";
import { FooterProps } from "../../models";
import { flexCenter } from "../../styles/";
export const Footer = React.memo(
  ({
    footer: {
      footerName = "",
      typography: { color = "text.primary", variant = "subtitle2", sx = {} },
    },
  }: FooterProps) => {
    return (
      <Box sx={{ ...flexCenter, margin: "1rem 0rem" }}>
        <Typography color={color} variant={variant} sx={sx}>
          {footerName}
        </Typography>
      </Box>
    );
  }
);
