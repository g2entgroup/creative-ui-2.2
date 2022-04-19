import React from "react";
import { Box } from "@chakra-ui/react";

export const Main = ({ children }) => (
  <Box
    maxWidth='100vw'
    display='flex'
    flexDir='column'
    alignItems={['center', 'center', 'center', 'center']}
    justifyContent={['center', 'center', 'center', 'center']}
    marginTop={10}>
    {children}
  </Box>
);