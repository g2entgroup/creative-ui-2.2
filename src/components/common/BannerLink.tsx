import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import * as React from 'react'

export const BannerLink = (props: HTMLChakraProps<'a'>) => (
  <chakra.a
    {...props}
    href="#"
    px="4"
    py="1.5"
    textAlign="center"
    borderWidth="1px"
    borderColor="whiteAlpha.400"
    fontWeight="medium"
    rounded="base"
    _hover={{ bg: 'whiteAlpha.200' }}
  />
)
