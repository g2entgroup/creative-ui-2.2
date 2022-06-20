import { Box, Heading, Text } from "@chakra-ui/react";

export const Card = ({title}:{title: string}) => {
    return (
        <Box
            cursor={'pointer'}
            padding={5}
            borderTop='1px solid white'
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'>
            <Box>
                <Heading
                    size='md'>
                    {title}
                </Heading>
                <Heading
                    size='sm'>
                    {title}
                </Heading>
                <Box>
                </Box>
                <Box>
                </Box>
            </Box>
            <Box>
                <Text>{'>'}</Text>
            </Box>
        </Box>
    )
};