const brandcards = 8;
import { SimpleGrid, Text } from "@chakra-ui/react"
import BrandDiscovery from '../components/common/Cards/branddiscovery'
export default function Discover() {
    return(
        <>
        <Text as="h1" fontSize="4xl" fontStyle="bold" margin="10">Discover and Explore</Text>
        <SimpleGrid columns={{sm: 1, md: 4}} marginBottom={10} spacing={10}>
            <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=1" name="NFT Name" bio="awesome creative NFT" creator="@creator"/>
            <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=2" name="NFT Name" bio="awesome creative NFT" creator="@creator" />
            <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=3" name="NFT Name" bio="awesome creative NFT" creator="@creator" />
            <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=4" name="NFT Name" bio="awesome creative NFT" creator="@creator" />
            <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=5" name="NFT Name" bio="awesome creative NFT" creator="@creator" />
            <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=6" name="NFT Name" bio="awesome creative NFT" creator="@creator" />
            <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=7" name="NFT Name" bio="awesome creative NFT" creator="@creator" />
            <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=8" name="NFT Name" bio="awesome creative NFT" creator="@creator" />
        </SimpleGrid>
        </>
    )
}
