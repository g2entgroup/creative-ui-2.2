import React from "react";
import { Box, Heading, Text, Button,Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { FaBeer } from 'react-icons/fa';
import { useRouter } from "next/router";
import { Card } from "src/components/voting";


export default function Vote() {
  const route = useRouter();
  const [ selection, setSelection ] = React.useState([false, false, false]) 
  const [value, setValue] = React.useState('1')
  const [snapshots] = React.useState([
    {
        title: 'Proposal to Boost the CHR-BUSD farm and a New Syrup Pool',
        stage: 'voting',
        startDate: '',
        startTime:'',
        endDate: '',
        endTime: '',
        date: '',
        content: '',
        type: 'community',
    },
    {
        title: 'Proposal to Boost the CHR-BUSD farm and a New Syrup Pool',
        stage: 'v',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        date: '',
        content: '',
        type: 'core',
    },

  ])

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
            onClick={() => route.push('/vote/preposal')}
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
                    alignItems={'center'}>
                    <FaBeer 
                        color={'white'}/>
                    <Text 
                        marginLeft={2}
                        color={'white'}>Core</Text>
                    </Box>
                    <Box
                    cursor={'pointer'}
                    margin={2}
                    display={'flex'}
                    flexDir={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <FaBeer
                        color={'white'} />
                    <Text
                        marginLeft={2}
                        color={'white'}>Community</Text>
                    </Box>
                    <Box
                    cursor={'pointer'}
                    margin={2}
                    display={'flex'}
                    flexDir={'row'}>
                    <Text
                        color={'white'}>All</Text>
                    </Box>
                </Box>
                <Box
                    display={'flex'}
                    flexDir={'row'}
                    minW={'70vw'}
                    padding={2}
                    background={'brand.300'}>
                    <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                            <Radio 
                                value='1'
                                color='white'>
                                    <Text
                                        color='white'>
                                            Vote Now
                                    </Text>
                            </Radio>
                            <Radio
                                value='2'
                                color='white'>
                                    <Text
                                        color='white'>
                                            Soon
                                    </Text>
                            </Radio>
                            <Radio
                                value='3'
                                color='white'>
                                    <Text
                                        color='white'>
                                            Closed
                                    </Text>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
                {
                    snapshots.map((data) => {
                        return(
                            <Card
                                title={data.title} />
                        )
                    })
                }
                
            </Box>  
        </Box>
    </Box>
  );
}
