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
            flexDir={['column', 'row']}
            flexWrap={['wrap']}
            alignItems='center'
            justifyContent='flex-start'
            marginBottom={50}>
            <HStack 
                display='flex'
                flexDir='row'
                flexWrap='wrap'
                maxW='100%'
                spacing={8}>
            <TabList
                display='flex'
                flexDir='row'
                flexWrap='wrap'
                maxW='100%'>
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
                        flexWrap={['wrap']}
                        alignItems={['center']}
                        justifyContent='flex-start'>
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