  import React from "react";
import { 
  Box, 
  Heading, 
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark, 
} from "@chakra-ui/react";
import { useRouter } from 'next/router';

export default function More() {
  const router = useRouter()
  const {
    end, 
    start, 
    title, 
    body, 
    choices, 
    snapshot, 
    creator, 
    identifier, 
    scores
  } = router.query
  const [selection, setSelection] = React.useState([false, false, false])

  const Totalscore = () => {
    console.log(scores)
  }

  React.useEffect(() => {
    Totalscore()
  },[])

  return (
    <Box
      display='flex'
      flexDirection='row'
      flexWrap={'wrap'}
      alignItems='center'
      justifyContent='center'>
      <Box
        maxW={['100vw', '100vw', '100vw', '40vw']}>
          <Box
            padding={5}>
            <Box>
            </Box>
            <Box>
              <Heading>{title}</Heading>
            </Box>
          </Box>
          <Box
            padding={5}>
            <Box>
              <Text>{body}</Text>
            </Box>
          </Box>
          <Box
            padding={5}
            marginBottom={5}
            minW={['100vw', '100vw', '400px', '400px']}>
            <Box  
              background='brand.400'
              padding={2}
              display='flex'
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              flexDirection='row'>
              <Heading
                size={'md'}
                color="white">Current results</Heading>
            </Box>
            <Box
              border={'2px solid #ec407a'}
              borderBottomRadius={10}
              background={'#f0f0f0'}
              padding={10}>
              <Box  
                display='flex'
                flexDirection='row'>
                
              </Box>
              <Box
                display='flex'
                flexDirection='row'>
                
              </Box>
            </Box>
        </Box>
      </Box>
      <Box>
        <Box
          padding={5}
          marginBottom={5}
          minW={['100vw', '100vw', '100vw', '400px']}>
          <Box  
            background='brand.400'
            padding={2}
            display='flex'
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            flexDirection='row'>
            <Heading
              size={'md'}
              color="white">Details</Heading>
          </Box>
          <Box
            border={'2px solid #ec407a'}
            borderBottomRadius={10}
            background={'#f0f0f0'}
            padding={10}>
            <Box
              padding={2}>
              <Text
                  color='black'>{`Creator:  ${creator}`}</Text>
              <Text
                color='black'>{`Snapshot:  ${snapshot}`}</Text>
            </Box>
            <Box
              background={'black'}
              padding={2}
              borderRadius={10}>
              <Box  
                display='flex'
                flexDirection='row'>
                <Text
                  color='white'>{`start date: ${start}`}</Text>
              </Box>
              <Box
                display='flex'
                flexDirection='row'>
                <Text
                  color='white'>{`end date: ${end}`}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          padding={5}
          marginBottom={5}
          minW={['100vw', '100vw', '100vw', '400px']}>
          <Box  
            background='brand.400'
            padding={2}
            display='flex'
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            flexDirection='row'>
            <Heading
              size={'md'}
              color="white">Current results</Heading>
          </Box>
          <Box
            border={'2px solid #ec407a'}
            borderBottomRadius={10}
            background={'#f0f0f0'}
            padding={10}>
            {
              choices.map((item: any) => {
                const number = 0;
                return (
                  <Box
                    display='flex'
                    flexDirection='column'>
                      {item}
                      <Slider aria-label='slider-ex-6'>
                        <SliderMark
                          value={20}
                          textAlign='center'
                          bg='blue.500'
                          color='white'
                          mt='-10'
                          ml='-5'
                          w='12'>
                        </SliderMark>
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                      </Slider>
                  </Box>
                )
              })
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
