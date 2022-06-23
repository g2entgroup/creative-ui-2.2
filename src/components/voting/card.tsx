import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Card = ({title}:{title: string}) => {
    const router = useRouter();

    const goNext = (event) => {
        event.preventDefault()
        router.push({
            pathname: '/voting/more',
            query: { name: 'Someone' }
        })
    };

    return (
        <Box
            cursor={'pointer'}
            padding={5}
            borderTop='1px solid white'
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            borderBottom={'1px solid black'}>
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
            <Box
                onClick={(event) => goNext(event)}>
                <Text>{'>'}</Text>
            </Box>
        </Box>
    )
};