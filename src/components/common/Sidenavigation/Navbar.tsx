import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings,
    FiFolder,
    FiMic,
    FiGrid,
    FiHeadphones,
    FiRadio,
    FiDownload,
    FiHeart
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import { AiFillWallet } from 'react-icons/ai'
import { FaHistory } from 'react-icons/fa'
import { BsMusicNote, BsMusicNoteList } from 'react-icons/bs'

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." />
                <NavItem navSize={navSize} icon={FiFolder} title="Albums" active />
                <NavItem navSize={navSize} icon={FiMic} title="Artists"  />
                <NavItem navSize={navSize} icon={FiGrid} title="Genres" />
                <NavItem navSize={navSize} icon={FiDollarSign} title="Top Tracks" />
                <NavItem navSize={navSize} icon={FiHeadphones} title="Free music" />
                <NavItem navSize={navSize} icon={FiRadio} title="Stations" />
                <NavItem navSize={navSize} icon={FiDownload} title="Downloads" />
                <NavItem navSize={navSize} icon={AiFillWallet} title="Purchased" />
                <NavItem navSize={navSize} icon={FiHeart} title="Favourites" />
                <NavItem navSize={navSize} icon={FaHistory} title="History" />
                <NavItem navSize={navSize} icon={BsMusicNoteList} title="Featured Playlist" />
                <NavItem navSize={navSize} icon={BsMusicNote} title="Create Playlist" />



            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Sylwia Weller</Heading>
                        <Text color="gray">0x3456...7967</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}