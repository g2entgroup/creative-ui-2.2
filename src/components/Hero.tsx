import { Box, Flex, chakra, Heading, Stack, Button } from '@chakra-ui/react'
export default function Hero() {

  const myLoader = ({ src, width, quality }) => {
    return `https://res.cloudinary.com/${src}?w=${width}&q=${quality || 75}`
  }

    return(
        <Box
        w="full"
        h="container.sm"
        backgroundImage="url(https://res.cloudinary.com/dyangxc7h/image/upload/v1623552689/creative/brands.jpg)"
        bgPos="center"
        bgSize="cover"
      >
        <Flex
          align="center"
          pos="relative"
          justify="center"
          boxSize="full"
          bg="blackAlpha.700"
        >
          <Stack textAlign="center" alignItems="center" spacing={6}>
            <Heading
              fontSize={["2xl", , "3xl"]}
              fontWeight="semibold"
              color="white"
              textTransform="uppercase"
            >
              Build Your new{" "}
              <chakra.span color="blue.400" textDecor="underline">
                Saas
              </chakra.span>
            </Heading>
            <Button
              colorScheme="brand"
              textTransform="uppercase"
              w="fit-content"
              className="px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
              Start project
            </Button>
          </Stack>
        </Flex>
      </Box>
    )
}