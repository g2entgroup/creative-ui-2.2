import React from "react";
import { Box } from "@chakra-ui/react";

export const Main = ({ children }) => (
  <Box w="100%" p={1} m={3}>
    {children}
  </Box>
);