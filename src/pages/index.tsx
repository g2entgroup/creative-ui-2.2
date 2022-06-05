import { Heading, Box, useColorModeValue, Button, Divider } from "@chakra-ui/react";
import CreativeCard from '../components/common/Cards/CreativeCard';
import BrandHero from '../components/BrandHero';
import { Content } from "../components/common/Content/Content";
import { Main } from "../components/common/Main/Main";
import LiveCampaigns from "../components/LiveCampaigns";
import TrendingCollections from "../components/TrendingCollections";
import FilterTab from "../components/common/FilterTab/FilterTab";
import BrandDiscovery from "../components/common/Cards/branddiscovery";
import TopCreatives from "../components/TopCreatives";

export default function Home() {
  return (
    <Box>
      <BrandHero />
      <Main>
        {/* LATEST BRAND CAMPAIGNS */}
        <Heading 
          as="h2"
          margin={5} 
          size="lg" 
          color={useColorModeValue("black", "white")}          
          mx={10}>🆕 Latest Brand Campaigns</Heading>
          <Divider w={200} mb={2}/>
        <Box
           display='flex'
           flexDir={['column','column','row', 'row']}
           padding={[2, 2, 2, 10]}
           alignItems={['center','center','flex-start', 'flex-start']}
           justifyContent={['center','center','center', 'center']}
           flexWrap={['nowrap', 'nowrap', 'wrap', 'wrap']}
           >
          <CreativeCard />
          <CreativeCard />
          <CreativeCard />
          <CreativeCard />
          <CreativeCard />
        </Box>
        {/* LATEST BRAND CAMPAIGNS END */}
      </Main>
      <Main>
        {/* TOP CREATORS */}
        <Heading 
          as="h2" 
          size="lg" 
          color={useColorModeValue("black", "white")}          
          mx={10}>🏆 Top Creatives</Heading>
          <Divider w={200} my={4}/>
        <TopCreatives />
      </Main>
      <Main>
        {/* LIVE BRAND CAMPAIGNS */}
        <Heading 
          as="h2" 
          size="lg" 
          margin={5}
          color={useColorModeValue("black", "white")}          
          mx={10}>🎬 Live Brand Campaigns</Heading>
          <Divider w={200} mb={2}/>
        <Box
           display='flex'
           minWidth='100vw'
           flexDir={['column','column','row', 'row']}
           padding={[2, 2, 2, 10]}
           alignItems={['center','center','flex-start', 'flex-start']}
           justifyContent={['center','center','center', 'center']}
           flexWrap={['nowrap', 'nowrap', 'wrap', 'wrap']}>
          <LiveCampaigns />
          <LiveCampaigns />
          <LiveCampaigns />
          <LiveCampaigns />
          <LiveCampaigns />
        </Box>
        {/* LIVE BRAND CAMPAIGNS END */}
      </Main>
      <Main>
        {/* TRENDING COLLECTIONS */}
        <Heading
          as="h2" 
          size="lg" 
          color={useColorModeValue("black", "white")} 
          mx={10}>📈 Trending Collections</Heading>
          <Divider w={200} my={4}/>
        <Box
          display='flex'
          minWidth='100vw'
          flexDir={['column','column','row', 'row']}
          padding={[2, 2, 2, 10]}
          alignItems={['center','center','flex-start', 'flex-start']}
          justifyContent={['center','center','center', 'center']}
          flexWrap={['nowrap', 'nowrap', 'wrap', 'wrap']}>
          <TrendingCollections />
          <TrendingCollections />
          <TrendingCollections />
          <TrendingCollections />
          <TrendingCollections />
          <TrendingCollections />
        </Box>
        {/* TRENDING COLLECTIONS END */}
      </Main>
      <Main>
        {/* DISCOVER */}
        <Heading 
          as="h2" 
          margin={5}
          size="lg" 
          color={useColorModeValue("black", "white")}
          mx={10}>🔭 Discover</Heading>
          <Divider w={200} mb={2}/>
        <FilterTab />
        <Box             
          display='flex'
          maxWidth='100vw'
          flexDir={['column','column','column', 'row']}
          padding={[2, 2, 2, 10]}
          alignItems={['center','center','flex-start', 'flex-start']}
          justifyContent={['center','center','center', 'center']}
          flexWrap={['nowrap', 'nowrap', 'nowrap', 'wrap']}>
          <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=1" />
          <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=2" />
          <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=3" />
          <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=4" />
        </Box>
        <Box
          display='flex'
          maxWidth='100vw'
          minW={'100vw'}
          flexDir={['row']}
          padding={[2, 2, 2, 10]}
          alignItems={['center']}
          justifyContent={['center']}
          flexWrap={['nowrap']}>
            <Button colorScheme="pink">
              Load More
            </Button>
        </Box>
        {/* DISCOVER END*/}
      </Main>
    </Box>
  );
}
