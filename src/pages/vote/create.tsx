import React, { useState, useRef } from 'react'
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Stack,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import snapshot from '@snapshot-labs/snapshot.js'
import { FaWindowClose } from 'react-icons/fa'
import { Web3Provider } from '@ethersproject/providers'

const hub = 'https://hub.snapshot.org'
const client = new snapshot.Client712(hub)

export default function Create() {
  const [account, setAccount] = useState('')
  const web3 = new Web3Provider(window.ethereum)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [choices, setChoices] = useState(['yes', 'no'])

  const inputRef = useRef()

  function handleChange(i, event) {
    const values = [...choices]
    values[i] = event.target.value
    setChoices(values)
  }

  function handleAdd() {
    const values = [...choices]
    values.push('')
    setChoices(values)
  }

  function handleRemove(i) {
    const values = [...choices]
    values.splice(i, 1)
    setChoices(values)
  }

  const submit = async () => {
    try {
      const provider = await snapshot.utils.getProvider('100')
      const block = await snapshot.utils.getBlockNumber(provider)

      const receipt = (await client.proposal(web3, account, {
        space: 'thecreative.eth',
        type: 'single-choice',
        title: title,
        body: content,
        choices: choices,
        start: parseInt(
          (Number(new Date(`${startDate} ${startTime}`)) / 1000).toFixed()
        ),
        end: parseInt(
          (Number(new Date(`${endDate} ${endTime}`)) / 1000).toFixed()
        ),
        snapshot: block,
        discussion: '',
        plugins: JSON.stringify({}),
      })) as any
      console.log(`created proposal ${receipt.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const getAddress = async () => {
    const [account] = await web3.listAccounts()
    setAccount(account)
  }

  const changeInput = (event: any, type: string) => {
    if (type === 'title') {
      setTitle(event.target.value)
    } else if (type === 'content') {
      setContent(event.target.value)
    } else if (type === 'start date') {
      setStartDate(event.target.value)
    } else if (type === 'start time') {
      setStartTime(event.target.value)
    } else if (type === 'end time') {
      setEndTime(event.target.value)
    } else if (type === 'end date') {
      setEndDate(event.target.value)
    }
  }

  React.useEffect(() => {
    getAddress()
  }, [])

  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      alignItems="flex-start"
      justifyContent="center"
      padding={10}
    >
      <Box padding={5} width={['100%', '100%', '100%', '40%']}>
        <Box marginBottom={4} cursor="pointer">
          <Box padding={4} borderTopRadius={20} background={'brand.400'}>
            <Heading size="md" color="white">
              Title
            </Heading>
          </Box>
          <Box
            background={'brand.300'}
            padding={4}
            borderBottomRadius={20}
            border={'1px solid #d32f2f'}
          >
            <Input
              color="black"
              fontWeight={'bold'}
              background={'white'}
              onChange={(event) => {
                changeInput(event, 'title')
              }}
            />
          </Box>
        </Box>
        <Box marginBottom={4} cursor="pointer">
          <Box padding={4} borderTopRadius={20} background={'brand.400'}>
            <Heading color="white" size="md">
              Content
            </Heading>
          </Box>
          <Box
            background={'brand.300'}
            padding={4}
            borderBottomRadius={20}
            border={'1px solid #d32f2f'}
          >
            <Textarea
              color="black"
              fontWeight={'bold'}
              background={'white'}
              placeholder="Here is a sample placeholder"
              onChange={(event) => {
                changeInput(event, 'content')
              }}
            />
          </Box>
        </Box>
        <Box marginBottom={4} cursor="pointer">
          <Box padding={4} borderTopRadius={20} background={'brand.400'}>
            <Heading color={'white'} size="md">
              Choices
            </Heading>
          </Box>
          <Box
            background={'brand.300'}
            padding={4}
            borderBottomRadius={20}
            border={'1px solid #d32f2f'}
          >
            <Stack spacing={4}>
              <form>
                {choices.map((field, index) => {
                  return (
                    <InputGroup key={index}>
                      <Input
                        marginBottom={5}
                        className="choices"
                        background="white"
                        placeholder="Enter Choice"
                        value={field || ''}
                        ref={inputRef}
                        onChange={(e) => handleChange(index, e)}
                      />
                      <InputRightElement
                        children={
                          <Box onClick={() => handleRemove(index)}>
                            <FaWindowClose />
                          </Box>
                        }
                      />
                    </InputGroup>
                  )
                })}
              </form>
            </Stack>

            <Button
              marginTop={4}
              background={'brand.400'}
              onClick={() => handleAdd()}
            >
              <Heading color="white" size="sm">
                Add
              </Heading>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box padding={5} width={['100%', '100%', '100%', '40%']}>
        <Box
          padding={4}
          borderTopRadius={20}
          background={'brand.400'}
          cursor="pointer"
        >
          <Heading color="white" size="md">
            Actions
          </Heading>
        </Box>
        <Box
          background={'brand.300'}
          padding={4}
          borderBottomRadius={20}
          border={'1px solid #d32f2f'}
        >
          <Heading color="white" size="sm">
            Start Date
          </Heading>
          <Input
            type="date"
            background={'white'}
            onChange={(event) => {
              changeInput(event, 'start date')
            }}
          />
          <Heading marginTop={4} color="white" size="sm">
            Start time
          </Heading>
          <Input
            type="time"
            background={'white'}
            onChange={(event) => {
              changeInput(event, 'start time')
            }}
          />
          <Heading marginTop={4} color="white" size="sm">
            End date
          </Heading>
          <Input
            type="date"
            background={'white'}
            onChange={(event) => {
              changeInput(event, 'end date')
            }}
          />
          <Heading marginTop={4} color="white" size="sm">
            End time
          </Heading>
          <Input
            type="time"
            background={'white'}
            onChange={(event) => {
              changeInput(event, 'end time')
            }}
          />
          <Button
            marginTop={4}
            background={'brand.400'}
            onClick={() => submit()}
          >
            <Heading color="white" size="sm">
              Submit
            </Heading>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
