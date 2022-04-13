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
            maxWidth='100vw'
            marginBottom={50}>
            <HStack
                display='flex'
                margin={0}
                flexDir={['column','column', 'column', 'row']}>
            <TabList
                display='flex'
                flexDir={['column','column', 'column', 'row']}
                margin={[0]}>
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
            <TabPanels
                display='flex'
                margin={0}
                flexDir={['column','column', 'column', 'row']}
                >
                <TabPanel>
                    <Box             
                         display='flex'
                         maxWidth='90vw'
                         flexDir={['column','column','column', 'row']}
                         padding={[2, 2, 2, 10]}
                         alignItems={['center','center','center', 'flex-start']}
                         justifyContent={['center','center','center', 'flex-start']}
                         flexWrap={['nowrap', 'nowrap', 'nowrap', 'wrap']}>
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