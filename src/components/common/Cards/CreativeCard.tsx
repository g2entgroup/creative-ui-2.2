import React from "react";
import { Box, Badge, useToken, useColorModeValue } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import ReactPlayer from 'react-player/lazy';
import { useRouter } from 'next/router';

export default function CreativeCard() {
  const router = useRouter()
  const property = {
    videoUrl: "https://youtu.be/wQlN0BVltZI",
    imageAlt: "Tesla Campaign",
    crtv: 40,
    apr: 18.78,
    brand: "Tesla",
    product: "Model Y",
    formattedPrice: "$79,900.00",
    reviewCount: 34,
    rating: 3
  };

  const [brand400, brand200] = useToken(
    // the key within the theme, in this case `theme.colors`
    "colors",
    // the subkey(s), resolving to `theme.colors.red.100`
    ["brand.400", "brand.200"],
    // a single fallback or fallback array matching the length of the previous arg
  )

  const goTo = () => {
    router.push('/details/1')
  };

  return (
    <Box 
      onClick={() => goTo()}
      maxW="sm"
      minW='sm'
      margin={5} 
      borderWidth="1px" 
      rounded="lg" 
      overflow="hidden" 
      alignItems={"center"} 
      cursor='pointer'
      height="511px" 
      width="full" 
      boxShadow={`inset 0 4px 0 ${brand400}, 0 0 8px ${brand200}`}>
      
      <ReactPlayer 
        url={property.videoUrl}
        playing={true}
        loop={true}
        width='100%'
        height='70%'
      />
    
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge rounded="full" px="2" color={brand400}>
            New
          </Badge>
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
          color={useColorModeValue("black", "white")}
          noOfLines={1}
        >
          {property.brand} - {property.product}
        </Box>

        <Box color={useColorModeValue("black", "white")}>
          {property.formattedPrice}
          <Box as="span" 
            bgGradient="linear(to-l, #7928CA, #e50168)"
            bgClip="text"
            fontSize="lg"
            fontWeight="extrabold" 
          >
            &nbsp;/ Prize Reward
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
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
