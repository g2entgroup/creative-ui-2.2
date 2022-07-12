import React from "react";
import { Box, Heading, Input, Textarea, Button } from "@chakra-ui/react";
import snapshot from '@snapshot-labs/snapshot.js';
const hub = 'https://hub.snapshot.org';
const client = new snapshot.Client712(hub);

export default function Create() {
  const [ snapshotClient] = React.useState<any>(client);
  const [ selection, setSelection] = React.useState([false, false, false]);
  const [ title, setTitle ] = React.useState<string>("");
  const [ content, setContent ] = React.useState<string>("");
  const [ choices, setChoices ] = React.useState([]);
  const [ startDate, setStartDate ] = React.useState();
  const [ startTime, seStarttTime ] = React.useState();
  const [ endEnd, setEndDate ] = React.useState();
  const [ endTime, setEndTime ] = React.useState();

  const submit = () => {
  }

  return (
    <Box
      display='flex'
      flexDirection='row'
      flexWrap='wrap'
      alignItems='flex-start'
      justifyContent='center'
      padding={10}>
      <Box
        padding={5}
        width={['100%', '100%', '100%', '40%']}>
        <Box
          margin={4}
          cursor='pointer'>
          <Box
            padding={4}
            borderTopRadius={20}
            background={'brand.400'}>
            <Heading
              size='md'
              color='white'>Title</Heading>
          </Box>
          <Box
            background={'brand.300'}
            padding={4}
            borderBottomRadius={20}
            border={'1px solid #d32f2f'}>
            <Input 
              color='black'
              fontWeight={'bold'}
              background={'white'}/>
          </Box>
        </Box>  
        <Box
          margin={4}
          cursor='pointer'>
          <Box
            padding={4}
            borderTopRadius={20}
            background={'brand.400'}>
            <Heading
              color='white'
              size='md'>Content</Heading>
          </Box>
          <Box
            background={'brand.300'}
            padding={4}
            borderBottomRadius={20}
            border={'1px solid #d32f2f'}>
              <Textarea
                color='black'
                fontWeight={'bold'}
                background={'white'} 
                placeholder='Here is a sample placeholder' />
          </Box>
        </Box>
        <Box
          margin={4}
          cursor='pointer'>
          <Box
            padding={4}
            borderTopRadius={20}
            background={'brand.400'}>
            <Heading
              color={'white'}
              size='md'>Choices</Heading>
          </Box>
          <Box
            background={'brand.300'}
            padding={4}
            borderBottomRadius={20}
            border={'1px solid #d32f2f'}>      
            <Input
              className="choices"
              background={'white'}/>
            <Input
              className="choices"
              marginTop={4}
              background={'white'}/>
              {
                choices.map(() => {
                  return(
                    <Input 
                      className="choices"
                      marginTop={4}
                      background={'white'}/>
                  )
                }) 
              }
            <Button
              marginTop={4}
              background={'brand.400'}
              onClick={() =>  submit()}>
              <Heading
                color='white'
                size='sm'>
                  Add 
              </Heading>
            </Button>
          </Box>
        </Box>  
      </Box>
      <Box
        padding={5}
        width={['100%', '100%', '100%', '40%']}>
        <Box
          padding={4}
          borderTopRadius={20}
          background={'brand.400'}
          cursor='pointer'>
          <Heading
            color='white'
            size='md'>Actions</Heading>
        </Box>
        <Box
            background={'brand.300'}
            padding={4}
            borderBottomRadius={20}
            border={'1px solid #d32f2f'}>
            <Heading
              color='white'
              size='sm'>
                Start Date
            </Heading>
            <Input 
              type="date"
              background={'white'}/>
            <Heading
              marginTop={4}
              color='white'
              size='sm'>
                Start time
            </Heading>
            <Input 
              type="time"
              background={'white'}/>
            <Heading
              marginTop={4}
              color='white'
              size='sm'>
                End date
            </Heading>
            <Input 
              type="date"
              background={'white'}/>
            <Heading
              marginTop={4}
              color='white'
              size='sm'>
                End time
            </Heading>
            <Input 
              type='time'
              background={'white'}/>
            <Button
              marginTop={4}
              background={'brand.400'}
              onClick={() =>  submit()}>
              <Heading
                color='white'
                size='sm'>
                  Submit
              </Heading>
            </Button>
        </Box>  
      </Box>
    </Box>
  );
}
