import { Heading, SimpleGrid, Box, OrderedList, ListItem, Avatar, AvatarBadge, Link, Image, useColorModeValue } from "@chakra-ui/react";
import CreativeCard from '../components/common/Cards/CreativeCard';
import BrandHero from '../components/BrandHero';
import { Content } from "../components/common/Content/Content";
import { Main } from "../components/common/Main/Main";
import LiveCampaigns from "../components/LiveCampaigns";
import TrendingCollections from "../components/TrendingCollections";
import FilterTab from "../components/common/FilterTab/FilterTab";
import TopCreatives from "../components/TopCreatives";

export default function Home() {
  return (
    <Content>
      <BrandHero />
      <Main>
        {/* LATEST BRAND CAMPAIGNS */}
        <Heading as="h2" size="lg" color="white" my={4}>🆕 Latest Brand Campaigns</Heading>
        <Box
           display='flex'
           margin='auto'
           flexDir={['column', 'row']}
           flexWrap={['wrap']}
           alignItems={['center']}
           justifyContent='flex-start'>
          <CreativeCard />
          <CreativeCard />
          <CreativeCard />
          <CreativeCard />
        </Box>
        {/* LATEST BRAND CAMPAIGNS END */}
      </Main>
      <Main>
        {/* TOP CREATORS */}
        <Heading as="h2" size="lg" color="white" my={4}>🏆 Top Creatives</Heading>
        <TopCreatives />
      </Main>
      {/* TOP CREATORS END */}
      <Main>
        {/* LIVE BRAND CAMPAIGNS */}
        <Heading as="h2" size="lg" color="white" my={4}>🎬 Live Brand Campaigns</Heading>
        <Box
           display='flex'
           margin='auto'
           flexDir={['column', 'row']}
           flexWrap={['wrap']}
           alignItems={['center']}
           justifyContent='flex-start'>
          <LiveCampaigns />
          <LiveCampaigns />
          <LiveCampaigns />
          <LiveCampaigns />
        </Box>
        {/* LIVE BRAND CAMPAIGNS END */}
      </Main>
      <Main>
        {/* TRENDING COLLECTIONS */}
        <Heading as="h2" size="lg" color="white" my={4}>📈 Trending Collections</Heading>
        <Box
           display='flex'
           margin='auto'
           flexDir={['column', 'row']}
           flexWrap={['wrap']}
           alignItems={['center']}
           justifyContent='flex-start'>
          <TrendingCollections />
          <TrendingCollections />
        </Box>
        {/* TRENDING COLLECTIONS END */}
      </Main>
      <Main>
        {/* DISCOVER */}
        <Heading as="h2" size="lg" color="white" my={4}>🔭 Discover</Heading>
        <FilterTab />
        {/* DISCOVER END*/}
      </Main>
    </Content>
  );
}
