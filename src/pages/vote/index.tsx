import React from "react"
import { Box, Heading, Text, Button,Radio, RadioGroup, Stack } from "@chakra-ui/react"
import {  FaUsers, FaCertificate } from 'react-icons/fa'
import { useRouter } from "next/router"
import { Card } from "src/components/voting"
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


export default function Vote ({ proposals }) {
    const route = useRouter()
    const [core] = React.useState(
        [
            "0x1Fde40a4046Eda0cA0539Dd6c77ABF8933B94260", 
            "0xdeb9e5915db81011c549799a9ea37ede4d72efba",
            "0xa73784a4f12f26cf9f36b5186825ab730ca05773",
            "0xa5e5860b34ac0c55884f2d0e9576d545e1c7dfd4",
            "0xa35c7ba6d28095a8ba49498ac554a5e26843391f",
            "0xe9caadf5ffa302774f0b99be7d8e40392c3edbae",
            "0x9590dd5f9d52db75650166cbdb455d9167dda74e",
            "0x73c318bc142ea515f00820c78ce88887c5bac0bf",
            "0x73932cc65df8865b10F339D6Ef9dE5E4830C14Ff"
        ]
    )
    const [ selectionType, setSelectionType ] = React.useState([false, false, true])  
    const [value, setValue] = React.useState('closed')
    const [type, setType] = React.useState('all')
    const [snapshots, setSnapshots] = React.useState(proposals)

    const filterState = () => {
        
    };

    const filterCore = () => {
        const newData = proposals.filter(item => isCore(item.author));
        const list = newData.filter(item => item.state === value);
        setSnapshots(list)
    };

    const filterCommunity = () => {
        const newData = proposals.filter(item => !isCore(item.author));
        const list = newData.filter(item => item.state === value);
        setSnapshots(list)
    };

    const reset = () => {
        const list = proposals.filter(item => item.state === value);
        setSnapshots(list)
    }

    const handleTypeChange = (id) => {
        let newArray = selectionType;
        setSelectionType((prev) => prev.map((item, index) => {
                if(index === id) {
                    return item = true
                } else {
                    return item = false;
                }
            })
        )
    };

    const isCore = (author) => {
        let state = false
        core.map((address) => {
            console.log()
            if(address === author){
                state = true
            }
        })
        return state
    };

    const convertDate = (date: any) => {
        date = new Date(date * 1000);
        return date.toUTCString();
    }

    React.useEffect(() => {
        filterState();
    },[value])
    
    React.useEffect(() => {
        if(selectionType[0]===true){
            filterCore()
        }
        if(selectionType[1]===true){
            filterCommunity()
        }
        if(selectionType[2]===true){
            reset()
        }
    },[selectionType, value])

    React.useEffect(() => {
        console.log(proposals)
    })

    return (
        <Box
        padding={20}>
        <Box>
            <Box>
            <Heading>Voting</Heading>
            </Box>
            <Box
            marginTop={5}>
            <Text>Have your say in the future of the Creative platform Ecosystem</Text>
            </Box>
            <Box
            marginTop={5}>
            <Button
                onClick={() => route.push('/vote/create')}
                padding={5}
                backgroundColor={'brand.400'}>
                <Heading
                size='sm'
                color={'white'}>Make a Proposal</Heading>
            </Button>
            </Box>
        </Box>
            <Box
                paddingTop={10}>
                <Box>
                    <Box>
                        <Heading>Proposal</Heading>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDir={'row'}
                        minW={'70vw'}
                        marginTop={5}
                        padding={2}
                        borderTopRadius={10}
                        background={'brand.400'}>
                        <Box
                        cursor={'pointer'}
                        margin={2}
                        display={'flex'}
                        flexDir={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        minW={10}
                        padding={2}
                        borderRadius={10}
                        onClick={() => handleTypeChange(0)}
                        background={selectionType[0]?'white': 'brand.400'}>
                        <FaCertificate
                            color={selectionType[0]? '#ec407a' :  'white'}/>
                        <Text 
                            marginLeft={2}
                            color={selectionType[0]? '#ec407a' :  'white'}>Core</Text>
                        </Box>
                        <Box
                        cursor={'pointer'}
                        margin={2}
                        display={'flex'}
                        flexDir={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        minW={10}
                        padding={2}
                        borderRadius={10}
                        onClick={() => handleTypeChange(1)}
                        background={selectionType[1]? 'white' : '#ec407a'}>
                        <FaUsers
                            color={selectionType[1]? '#ec407a' :  'white'} />
                        <Text
                            marginLeft={2}
                            color={selectionType[1]? '#ec407a' :  'white'}>Community</Text>
                        </Box>
                        <Box
                            cursor={'pointer'}
                            margin={2}
                            display={'flex'}
                            flexDir={'row'}
                            minW={10}
                            padding={2}
                            borderRadius={10}
                            justifyContent={'center'}
                            alignItems={'center'}
                            onClick={() => handleTypeChange(2)}
                            background={selectionType[2]? 'white' : '#ec407a'}>
                        <Text
                            color={selectionType[2]? '#ec407a' :  'white'}>All</Text>
                        </Box>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDir={'row'}
                        minW={'70vw'}
                        padding={2}
                        background={'#d32f2f'}>
                        <RadioGroup onChange={setValue} value={value}>
                            <Stack direction='row'>
                                <Radio 
                                    value='active'
                                    color='white'>
                                        <Text
                                            color='white'>
                                                Vote Now
                                        </Text>
                                </Radio>
                                <Radio
                                    value='pending'
                                    color='white'>
                                        <Text
                                            color='white'>
                                                Soon
                                        </Text>
                                </Radio>
                                <Radio
                                    value='closed'
                                    color='white'>
                                        <Text
                                            color='white'>
                                                Closed
                                        </Text>
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                    <Box
                        background={'#f0f0f0'}
                        border={'2px solid #ec407a'}
                        padding={5}
                        borderBottomRadius={25}>
                        {
                            snapshots.map((data) => {
                                return(
                                    <Card
                                        core={data.author}
                                        key={data.id}
                                        title={data.title}
                                        body={data.body}
                                        state={data.state}
                                        start={data.start}
                                        choices={data.choices}
                                        end={data.end}
                                        score={data.scores_total}
                                        scores={data.scores}
                                        creator={data.author}
                                        identifier={data.snapshot}
                                        snapshot={data.snapshot} />
                                )
                            })
                        }
                    </Box>
                </Box>  
            </Box>
        </Box>
  );
}


export async function getStaticProps() {
    const client = new ApolloClient({
        uri: 'https://hub.snapshot.org/graphql',
        cache: new InMemoryCache()
    });

    const { data } = await client.query({
        query: gql`
            query {
                proposals (
                    first: 50,
                    skip: 0,
                    where: {
                        space_in: ["thecreative.eth"],
                    },
                    orderBy: "created",
                    orderDirection: desc
                ) 
                {
                    id
                    title
                    body
                    choices
                    start
                    end
                    snapshot
                    state
                    scores
                    scores_by_strategy
                    scores_total
                    scores_updated
                    author
                    type
                    quorum
                    space {
                        id
                        name
                    }
                }
            }
        `
    })

    return {
      props: {
        proposals: data.proposals
      }
    }
}