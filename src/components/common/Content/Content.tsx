import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export const Content = ({ children }) => (
  <Flex direction="column" color={useColorModeValue("gray.900", "gray.900")}>
    {children}
  </Flex>
);