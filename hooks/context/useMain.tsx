import { MainContext } from "../../App";
import * as React from "react";

export const useMain = () => {
  const context = React.useContext(MainContext);
  if (!context) {
    throw new Error("UserContext must be within UserContextProvider");
  }

  return context;
};
