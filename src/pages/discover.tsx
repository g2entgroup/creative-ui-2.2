import { Text, Box, Button } from '@chakra-ui/react'
import BrandDiscovery from '../components/common/Cards/branddiscovery'
import FilterTab from '../components/common/FilterTab/FilterTab'
export default function Discover() {
  return (
    <Box
      display="flex"
      minW="100vw"
      maxW="100vw"
      flexDir={['column', 'column', 'row', 'row']}
      alignItems={['center', 'center', 'flex-start', 'flex-start']}
      justifyContent={['center', 'center', 'flex-start', 'flex-start']}
      flexWrap={['nowrap', 'nowrap', 'wrap', 'wrap']}
    >
      <Box
        display="flex"
        minWidth="100vw"
        flexDir={['column', 'column', 'column', 'column']}
        padding={[2, 2, 2, 10]}
        alignItems={['center', 'center', 'center', 'flex-start']}
        justifyContent={['center', 'center', 'center', 'center']}
        flexWrap={['nowrap', 'nowrap', 'wrap', 'wrap']}
      >
        <Text as="h1" fontSize="4xl" fontStyle="bold" margin="10">
          Discover and Explore
        </Text>
        <FilterTab />
      </Box>
      <Box
        display="flex"
        minWidth="100vw"
        flexDir={['column', 'column', 'row', 'row']}
        padding={[2, 2, 2, 10]}
        alignItems={['center', 'center', 'flex-start', 'flex-start']}
        justifyContent={['center', 'center', 'flex-start', 'flex-start']}
        flexWrap={['nowrap', 'nowrap', 'wrap', 'wrap']}
      >
        <BrandDiscovery imagelink="https://picsum.photos/200/300.webp?random=1" />
        <BrandDiscovery imagelink="https://picsum.photos/200/300.webp?random=2" />
        <BrandDiscovery imagelink="https://picsum.photos/200/300.webp?random=3" />
        <BrandDiscovery imagelink="https://picsum.photos/200/300.webp?random=4" />
        <BrandDiscovery imagelink="https://picsum.photos/200/300.webp?random=5" />
        <BrandDiscovery imagelink="https://picsum.photos/200/300.webp?random=6" />
        <BrandDiscovery imagelink="https://picsum.photos/200/300.webp?random=7" />
        <BrandDiscovery imagelink="https://picsum.photos/200/300.webp?random=8" />
      </Box>
      <Box
        display="flex"
        maxWidth="100vw"
        flexDir={['row']}
        padding={[2, 2, 2, 10]}
        alignItems={['center']}
        justifyContent={['center']}
        flexWrap={['nowrap']}
      >
        <Button colorScheme="pink" width="full">
          Load More
        </Button>
      </Box>
    </Box>
  )
}
