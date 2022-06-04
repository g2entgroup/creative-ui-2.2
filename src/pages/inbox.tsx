import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { 
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Heading, 
} from "@chakra-ui/react";

export default function Inbox() {
    return (
        <Box p={10}>
        <Heading padding={2}>INBOX</Heading>
        <Accordion allowMultiple>
            <AccordionItem>
                <AccordionButton>
                <Box display="1" textAlign="left">
                    Section 1 title
                </Box>
                <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <>
                    <AccordionButton>
                    <Box display="1" textAlign="left">
                        Section 2 title
                    </Box>
                    <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                    </AccordionPanel>
                </>
            </AccordionItem>
            </Accordion>
        </Box>
    )
}