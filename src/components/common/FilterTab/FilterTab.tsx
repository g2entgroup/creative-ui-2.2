import React from "react";
import { 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel, 
    SimpleGrid, 
    HStack,
    useToken
} from "@chakra-ui/react";
import Discover from "../../Discover";
import FilterSort from "../FilterSort/FilterSort";

export default function FilterTab() {
    

    return (
        <Tabs variant="soft-rounded" colorScheme="pink">
            <HStack spacing={8}>
            <TabList>
                <Tab>All</Tab>
                <Tab>🖼 Art</Tab>
                <Tab>📸 Photography</Tab>
                <Tab>🎮 Games</Tab>
                <Tab>👾 Metaverses</Tab>
                <Tab>🎵 Music</Tab>
                <Tab>🎞 Trailers</Tab>
                <Tab>🎭 Pilots</Tab>
            </TabList>
            <FilterSort />
            </HStack>
            <TabPanels>
                <TabPanel>
                <SimpleGrid columns={[1, 4]} spacing="2rem">
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                </SimpleGrid>
                </TabPanel>
                <TabPanel>
                <SimpleGrid columns={[1, 4]} spacing="2rem">
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                </SimpleGrid>
                </TabPanel>
                <TabPanel>
                <SimpleGrid columns={[1, 4]} spacing="2rem">
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                </SimpleGrid>
                </TabPanel>
                <TabPanel>
                <SimpleGrid columns={[1, 4]} spacing="2rem">
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                </SimpleGrid>
                </TabPanel>
                <TabPanel>
                <SimpleGrid columns={[1, 4]} spacing="2rem">
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                </SimpleGrid>
                </TabPanel>
                <TabPanel>
                <SimpleGrid columns={[1, 4]} spacing="2rem">
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                </SimpleGrid>
                </TabPanel>
                <TabPanel>
                <SimpleGrid columns={[1, 4]} spacing="2rem">
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                </SimpleGrid>
                </TabPanel>
                <TabPanel>
                <SimpleGrid columns={[1, 4]} spacing="2rem">
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                </SimpleGrid>
                </TabPanel>
            </TabPanels>
            </Tabs>
    );
}