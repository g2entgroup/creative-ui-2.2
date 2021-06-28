const brandcards = 8;
import { SimpleGrid, Text } from "@chakra-ui/react"
import BrandDiscovery from '../components/common/Cards/branddiscovery'
export default function Discover() {
    return(
        <>
        <Text as="h1" fontSize="4xl" fontStyle="bold" margin="10">Discover and Explore</Text>
        <SimpleGrid columns={{sm: 1, md: 4}} marginBottom={"10"}>
            <BrandDiscovery imagelink= "https://picsum.photos/200/300?random=1" name="@creator" bio="awesome creative NFT"/>
            <BrandDiscovery imagelink= "https://picsum.photos/200/300?random=2" name="@creator" bio="awesome creative NFT"/>
            <BrandDiscovery imagelink= "https://picsum.photos/200/300?random=3" name="@creator" bio="awesome creative NFT"/>
            <BrandDiscovery imagelink= "https://picsum.photos/200/300?random=4" name="@creator" bio="awesome creative NFT"/>
            <BrandDiscovery imagelink= "https://picsum.photos/200/300?random=5" name="@creator" bio="awesome creative NFT"/>
            <BrandDiscovery imagelink= "https://picsum.photos/200/300?random=6" name="@creator" bio="awesome creative NFT"/>
            <BrandDiscovery imagelink= "https://picsum.photos/200/300?random=7" name="@creator" bio="awesome creative NFT"/>
            <BrandDiscovery imagelink= "https://picsum.photos/200/300?random=8" name="@creator" bio="awesome creative NFT"/>
        </SimpleGrid>
        </>
    )
}
