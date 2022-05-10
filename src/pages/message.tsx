import {
    Input, 
    Textarea, 
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Box,
} from '@chakra-ui/react';

export default function Message() {
    return(
        <Box p={10}>
        <form>
            <FormControl id="fromEmail">
            <FormLabel>From:</FormLabel>
            <Input type="email" />
            </FormControl>
            <FormControl id="toEmail">
            <FormLabel>To:</FormLabel>
            <Input type="email" />
            </FormControl>
            <FormControl id="message">
            <FormLabel>Message:</FormLabel>
            <Textarea />
            </FormControl>
            <Button>Send</Button>
        </form>
    </Box> 
    ) 
}