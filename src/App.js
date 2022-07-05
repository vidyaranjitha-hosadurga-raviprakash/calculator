import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";
import { Calculator, Footer } from "./components";
import { calculatorKeys, footerProps } from "./constants";
import { flexCenterColumn } from "./styles";

export const App = () => {
  const getCalcKeys = useMemo(() => calculatorKeys, []);
  const memoizedFooter = useMemo(() => footerProps, []);

  return (
    <Container sx={{ ...flexCenterColumn }}>
      <Calculator calcKeys={getCalcKeys}></Calculator>
      <Footer footer={memoizedFooter}></Footer>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};
