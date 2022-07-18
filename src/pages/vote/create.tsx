import React from "react";
import { 
  Box, 
  Heading, 
  Input, 
  Textarea, 
  Button, 
  Stack,
  InputGroup,
  InputRightElement,
  InputLeftElement 
} from "@chakra-ui/react";
import snapshot from '@snapshot-labs/snapshot.js';
import {FaWindowClose} from 'react-icons/fa';
import { uuid } from 'uuidv4';
import { Web3Provider } from '@ethersproject/providers';
import { useAuth } from './../../services/context/auth';
import { useForm } from "react-hook-form";

const hub = 'https://hub.snapshot.org'
const client = new snapshot.Client712(hub);

export default function Create() {
  const [account, setAccount] = React.useState<any>("")
  const web3 = new Web3Provider(window.ethereum);
  const [ snapshotClient] = React.useState<any>(client);
  const [ selection, setSelection] = React.useState([false, false, false]);
  const [ title, setTitle ] = React.useState<string>("");
  const [ content, setContent ] = React.useState<string>("");
  const [ choices, setChoices ] = React.useState<string[]>(["yes", ""]);
  const [ startDate, setStartDate ] = React.useState<any>(new Date());
  const [ startTime, seStarttTime ] = React.useState<any>(new Date());
  const [ endDate, setEndDate ] = React.useState<any>(new Date());
  const [ endTime, setEndTime ] = React.useState<any>(new Date());
  const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
  const onSubmit = async data => { console.log(data); };
  let [ inputs, setInputs ] = React.useState([]); 
  
  const submit = async() => {
    try{
        console.log(register)
    }catch(error){
      console.log(error)
    }
  }

  const addInput = () => {
  }

  const removeInput = (number: number) => {
  }

  const getAddress = async() => {
    const [account] = await web3.listAccounts();
    setAccount(account);
  }

  const changeInput = (event: any, type:string) => {
    if(type==='title'){
      setTitle(event.target.value);
    }
    
    else if(type==='content'){
      setContent(event.target.value);
    }

    else if(type === 'start date'){
      setStartDate(new Date(event.target.value).getDate());
    }

    else if(type === 'start time'){
      setEndTime(new Date(event.target.value).getTime());
    }

    else if(type === 'end time'){
      setEndTime(new Date(event.target.value).getTime());
    }

    else if(type === 'end date'){
      setEndDate(new Date(event.target.value).getDate());
    }
  }

  React.useEffect(() => {
    getAddress();
  })


  
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
              background={'white'}
              onChange={(event) => {
                changeInput(event, 'title')
              }}/>
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
                placeholder='Here is a sample placeholder'
                onChange={(event) => {
                  changeInput(event, 'content')
                }} />
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
            <Stack spacing={4}>
            <form>
            {
                choices.map((item: any, index) => {
                  return(
                    <InputGroup
                      key={index}>
                      <Input 
                        className="choices"
                        background={'white'}
                        placeholder='Enter Choice'
                        {...register(`choice-${index}`, { required: `Please enter choice` })}
                         />
                      <InputRightElement 
                        children={
                        <Box
                          onClick={() => removeInput(item)}>
                          <FaWindowClose />
                        </Box>} 
                      />
                    </InputGroup>  
                  )
                }) 
            }
            </form>
            </Stack>
              
            <Button
              marginTop={4}
              background={'brand.400'}
              onClick={() =>  addInput()}>
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
              background={'white'}
              onChange={(event) => {
                changeInput(event, 'start date')
              }}/>
            <Heading
              marginTop={4}
              color='white'
              size='sm'>
                Start time
            </Heading>
            <Input 
              type="time"
              background={'white'}
              onChange={(event) => {
                changeInput(event, 'start time')
              }}/>
            <Heading
              marginTop={4}
              color='white'
              size='sm'>
                End date
            </Heading>
            <Input 
              type="date"
              background={'white'}
              onChange={(event) => {
                changeInput(event, 'end date')
              }}/>
            <Heading
              marginTop={4}
              color='white'
              size='sm'>
                End time
            </Heading>
            <Input 
              type='time'
              background={'white'}
              onChange={(event) => {
                changeInput(event, 'end time')
              }}/>
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
