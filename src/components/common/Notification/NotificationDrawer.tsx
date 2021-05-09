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
    Button
  } from "@chakra-ui/react";
  import { BellIcon } from '@chakra-ui/icons';
  import SingleAlert from '../Notification/SingleAlert';
  
  const NotificationDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
      return (
        <>
        <Button
            size="sm"
            fontSize="lg"
            aria-label="Notifications"
            variant="ghost"
            color="current"
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
