import React from "react";
import { Box } from "@chakra-ui/react";

export const Main = ({ children }) => (
  <Box
    minWidth='80vw'
    display='flex'
    flexDir='column'>
    {children}
  </Box>
);