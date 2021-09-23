import { Heading, SimpleGrid, Box, OrderedList, ListItem, Avatar, AvatarBadge, Link, Image } from "@chakra-ui/react";
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
        <SimpleGrid columns={[1, 4]} spacing="2rem">
          <CreativeCard />
          <CreativeCard />
          <CreativeCard />
         
        </SimpleGrid>
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
        <SimpleGrid columns={[1, 4]} spacing="2rem">
          <LiveCampaigns />
          <LiveCampaigns />
          <LiveCampaigns />
          <LiveCampaigns />
        </SimpleGrid>
        {/* LIVE BRAND CAMPAIGNS END */}
      </Main>
      <Main>
        {/* TRENDING COLLECTIONS */}
        <Heading as="h2" size="lg" color="white" my={4}>📈 Trending Collections</Heading>
        <SimpleGrid columns={[1, 4]} spacing="2rem">
          <TrendingCollections />
          <TrendingCollections />
          <TrendingCollections /> 
          <TrendingCollections />
        </SimpleGrid>
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
