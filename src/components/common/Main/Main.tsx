import React from "react";
import { Box } from "@chakra-ui/react";

export const Main = ({ children }) => (
  <Box
    minWidth='100vw'
    maxWidth='100vw'
    display='flex'
    flexDir='column'
    margin='auto'
    alignItems={['center', 'center', 'flex-start', 'flex-start']}
    marginTop={10}>
    {children}
  </Box>
);