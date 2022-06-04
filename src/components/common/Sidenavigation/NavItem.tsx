import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    LinkOverlay,
    LinkBox
} from '@chakra-ui/react'
import NavHoverBox from './NavHoverBox'

export default function NavItem({ icon, title, description, active, navSize }) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <LinkBox
                    backgroundColor={active && "pink.800"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "yellow.300" , textColor: 'black'}}
                    w={navSize == "large" && "100%"}
                >
                    <LinkOverlay>
                        <MenuButton w="100%">
                            <Flex>
                                <Icon as={icon} fontSize="xl" color={active ? "white" : "gray.200"} />
                                <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                            </Flex>
                        </MenuButton>
                    </LinkOverlay>
                </LinkBox>
                <MenuList
                    py={0}
                    border="none"
                    w={200}
                    h={200}
                    ml={5}
                >
                    <NavHoverBox title={title} icon={icon} description={description} />
                </MenuList>
            </Menu>
        </Flex>
    )
}