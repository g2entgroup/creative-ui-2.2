import React, { ReactElement, useRef } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    useColorModeValue
  } from "@chakra-ui/react";
  import { BellIcon } from '@chakra-ui/icons';
  import SingleAlert from '../Notification/SingleAlert';
  
  const NotificationDrawer = () => {
    const tcl = useColorModeValue("gray.900", "gray.50");
    const tcs = useColorModeValue("gray.900", "black");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
      return (
        <>
        <Button
            size="sm"
            fontSize="lg"
            aria-label="Notifications"
            variant="ghost"
            color={tcl}
            ml={{ base: "0", md: "3" }}
            ref={btnRef}
            onClick={onOpen}
            leftIcon={<BellIcon />} 
        >
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          variant={tcs}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Notification Center</DrawerHeader>
  
              <DrawerBody>
                <SingleAlert />
              </DrawerBody>
  
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
        </Button>
      </>
      )
  }

export default NotificationDrawer
