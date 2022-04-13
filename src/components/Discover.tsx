import React from "react";

import { Box, Badge, useToken } from "@chakra-ui/react";
import Icon from "@chakra-ui/icon";
import Image from 'next/image';
import { useRouter } from 'next/router';

const imgSrc = 'purple-emoji.gif'

const StarIcon = ({ color }) => <Icon name="star" color={color} />

export default function Discover() {
  const router = useRouter()
  const property = {
    imageAlt: "Purple Emoji Campaign",
    crtv: 40,
    apr: 18.78,
    title: "Purple Emoji - I Need You More Than Ever",
    formattedPrice: "$10,700.00",
    reviewCount: 6,
    rating: 4
  };

  const [brand400, brand200] = useToken(
    // the key within the theme, in this case `theme.colors`
    "colors",
    // the subkey(s), resolving to `theme.colors.red.100`
    ["brand.400", "brand.200"],
    // a single fallback or fallback array matching the length of the previous arg
  )

  const goTo = () => {
    router.push('/details/2');
  };

  return (
    <Box 
      maxW="sm" 
      borderWidth="1px" 
      rounded="lg" 
      margin={5}
      onClick={() => goTo()}
      overflow="hidden" 
      cursor='pointer'
      alignContent={"center"} 
      height="511px" 
      width="full" 
      boxShadow={`inset 0 4px 0 ${brand400}, 0 0 8px ${brand200}`}>
        <Image
          loading="lazy" 
          src={imgSrc}
          alt={property.imageAlt}
          layout="responsive"
          width={"100%"}
          height={"90%"}
        />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.crtv} CRTV &bull; {property.apr} % APR
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h2"
          lineHeight="tight"
          isTruncated
          color="white"
        >
          {property.title}
        </Box>

        <Box color="white">
          {property.formattedPrice}
          <Box as="span" 
            bgGradient="linear(to-l, #7928CA, #e50168)"
            bgClip="text"
            fontSize="lg"
            fontWeight="extrabold" 
          >
            &nbsp;/ Weekly Prize
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? "pink.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}