import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaArrowRight, FaBan } from 'react-icons/fa';

export const Card = (
    {
        title, 
        state, 
        type,
        body,
        start,
        end,
    }
    :
    {
        title: string, 
        state: string, 
        type?: string,
        body?: string,
        start?: string,
        end?: string,
    }
) => {
    const router = useRouter();

    const goNext = (event) => {
        event.preventDefault()
        router.push({
            pathname: '/vote/more',
            query: { 
                title: title,
                end: end,
                start: start, 
                body: body,
            }
        });
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
                <Box
                    marginBottom={5}>
                    <Heading
                        size='md'>
                        {title}
                    </Heading>
                </Box>
                <Box>
                    <Box
                        minW={'20'}
                        maxW={'20'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRadius={'20'}
                        background={'red.200'}>
                        <FaBan
                            color={'white'} />
                        <Text
                            marginLeft={1}
                            color={'white'}>
                                {state}
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Box
                onClick={(event) => goNext(event)}>
                <FaArrowRight />
            </Box>
        </Box>
    )
};