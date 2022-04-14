import React from "react";
import { 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel, 
    SimpleGrid, 
    HStack,
    Box,
    useToken
} from "@chakra-ui/react";
import Discover from "../../Discover";
import FilterSort from "../FilterSort/FilterSort";

export default function FilterTab() {
    

    return (
        <Tabs 
            variant="soft-rounded" 
            colorScheme="pink"
            marginBottom={50}>
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
                    <Box
                        display='flex'
                        margin='auto'
                        flexDir={['column', 'row']}
                        flexWrap={['wrap']}>
                        <Discover />
                        <Discover />
                        <Discover />
                        <Discover />
                    </Box>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}