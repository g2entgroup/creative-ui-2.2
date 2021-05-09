import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
    Button, 
    Switch
  } from "@chakra-ui/react";

  export default function FilterSort() {
    return(
        <Menu closeOnSelect={false}>
        <MenuButton as={Button} colorScheme="pink">
            Filter &amp; Sort
        </MenuButton>
        <MenuList minWidth="240px">
            <MenuOptionGroup defaultValue="asc" title="Sort by" type="radio">
            <MenuItemOption value="asc">Recently Added</MenuItemOption>
            <MenuItemOption value="desc">Cheapest</MenuItemOption>
            <MenuItemOption value="desc">Highest Price</MenuItemOption>
            <MenuItemOption value="desc">Most Liked</MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup title="Options" type="checkbox">
            <MenuItemOption value="verified">Verified Only <Switch colorScheme="brand"/>
            </MenuItemOption>
            </MenuOptionGroup>
        </MenuList>
        </Menu>
    );
}