import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaArrowRight, FaBan, FaClock, FaUsers, FaCertificate, FaVoteYea } from 'react-icons/fa';

export const Card = (
    {
        title, 
        state,
        body,
        start,
        end,
        choices,
        creator,
        identifier,
        snapshot,
        score,
        scores,
        core,
    }
    :
    {
        title: string, 
        state: string,
        body?: string,
        start?: string,
        end?: string,
        choices?: any[],
        creator?: any,
        identifier?: any,
        snapshot?: any,
        score?: number,
        scores?: any,
        core: boolean,
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
                choices: choices,
                creator: creator,
                identifier: identifier,
                snapshot: snapshot,
                scores: scores,
                score: score,
            }
        });
    };

    const convertDate = (date: any) => {
        date = new Date(date * 1000);
        return date.toUTCString();
    }

    const goTo = (id) => {
        let url = `https://polygonscan.com/block/${id}`
        window.open(url, '_blank');
    }

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
                <Box
                    marginBottom={5}>
                    <Heading
                        size='md'>
                        {title}
                    </Heading>
                </Box>
                <Box>
                    <Heading
                        size='sm'>
                        {
                             state==="closed"?
                             (`Ended: ${convertDate(end)}`)
                             :
                             state==="pending"?
                             (`Opens: ${convertDate(start)}`)
                             :
                             state==="active"?
                             (`Ends: ${convertDate(end)}`)
                             :
                             null
                        }
                    </Heading>
                </Box>
                <Box
                    display='flex'>
                    <Box
                        minW={'30'}
                        maxW={'40'}
                        padding={2}
                        margin={2}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRadius={'20'}
                        background={
                            state==="closed"?
                            '#86828f'
                            :
                            state==="pending"?
                            '#f0b922'
                            :
                            state==="active"?
                            '#32d0aa'
                            :
                            null
                        }>
                        {
                            state==="closed"?
                            (<FaBan
                                color={'white'} />)
                            :
                            state==="pending"?
                            (<FaClock 
                                color={'white'}/>)
                            :
                            state==="active"?
                            (<FaClock 
                                color={'white'}/>)
                            :
                            null
                        }
                        <Text
                            marginLeft={1}
                            color={'white'}>
                                {state}
                        </Text>
                    </Box>
                    <Box
                        minW={'20'}
                        maxW={'40'}
                        padding={2}
                        margin={2}
                        display={'flex'}
                        border={
                            core? "4px solid #ec407a":"4px solid purple"
                        }
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRadius={'20'}
                        background={'black'}>
                        {
                            core?
                            (
                                <FaCertificate
                                    color={
                                        core? "#ec407a": 'purple'
                                    }/>
                            )
                            :
                            (
                                <FaUsers
                                    color={
                                        core? "#ec407a": 'purple'
                                    } />
                            )
                        }
                        <Text
                            marginLeft={1}
                            color={core? "#ec407a": 'purple'}>
                                {core ? "core": "community"}
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Text>{}</Text>
            </Box>
            <Box
                onClick={(event) => goNext(event)}>
                <FaArrowRight />
            </Box>
        </Box>
    )
};