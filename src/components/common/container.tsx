import { Flex, useColorMode, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => {

  const { colorMode } = useColorMode();

  const color = { light: "white", dark: "white" };

  return (
    <Flex
      direction="column"
      bgColor="#161d2f"
      color={color[colorMode]}
      {...props}
    />
    
  );
};
