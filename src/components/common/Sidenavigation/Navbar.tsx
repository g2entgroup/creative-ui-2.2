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
            
            mb='4'
            marginTop="2.5vh"
            background='pink.600'
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
                    aria-label='iconbutton'
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
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard."  active={false}/>
                <NavItem navSize={navSize} icon={FiFolder} title="Albums" active={true} description='Albums'/>
                <NavItem navSize={navSize} icon={FiMic} title="Artists" active={false}  description='artist'/>
                <NavItem navSize={navSize} icon={FiGrid} title="Genres" active={false}  description='genres'/>
                <NavItem navSize={navSize} icon={FiDollarSign} title="Top Tracks" active={false} description='top tracks'/>
                <NavItem navSize={navSize} icon={FiHeadphones} title="Free music" active={false} description='free music'/>
                <NavItem navSize={navSize} icon={FiRadio} title="Stations" active={false} description='stations'/>
                <NavItem navSize={navSize} icon={FiDownload} title="Downloads" active={false} description='downloads'/>
                <NavItem navSize={navSize} icon={AiFillWallet} title="Purchased" active={false} description='purchased'/>
                <NavItem navSize={navSize} icon={FiHeart} title="Favourites" active={false} description='favourites'/>
                <NavItem navSize={navSize} icon={FaHistory} title="History" active={false}  description='history'/>
                <NavItem navSize={navSize} icon={BsMusicNoteList} title="Featured Playlist" active={false} description='featured playlist'/>
                <NavItem navSize={navSize} icon={BsMusicNote} title="Create Playlist" active={false} description='create playlist'/>



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
                        <Text color="gray.300">0x3456...7967</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}