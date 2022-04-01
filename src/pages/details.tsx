import { Content } from "../components/common/Content/Content";
import { Heading, Text, Box, Image } from "@chakra-ui/react";
import { FaTwitter, FaGlobe } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
import { CountDown } from "src/components/common/CountDown";

export default function Details() {
  const property = {
    videoUrl: 'https://youtu.be/wQlN0BVltZI',
    brand: 'Tesla',
    profile:'',
    twitter: '@tesla',
    website: 'https://www.tesla.com',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu convallis sapien. Etiam aliquet semper justo nec posuere. Aliquam molestie efficitur quam quis bibendum. Aliquam sodales nisi consequat metus egestas eleifend. Morbi tincidunt ex a volutpat congue. Phasellus convallis scelerisque arcu ac mollis. Curabitur non mauris in quam hendrerit vehicula quis tempor nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras eu pretium sem. Quisque pellentesque posuere volutpat. Aenean non mauris eget tellus aliquet interdum ac non nibh. Sed non purus id mi ornare cursus quis quis lorem. Ut ut risus tincidunt, laoreet ex eu, tristique est. Sed at maximus nisl. Integer vulputate eget orci at lacinia. Donec gravida in urna non viverra. Sed ultricies laoreet fermentum. Praesent consectetur hendrerit lacus ut consectetur. Vestibulum pulvinar ac leo sit amet pharetra. Aenean id dictum dolor, ut vestibulum justo. Donec efficitur sit amet ligula in pellentesque.',
    submission: '2022-10-1',
    voting: '2022-04-2',
    decision: '2022-07-2',
    capital: '1000 USDC'
  };

  return (
    <Content>
      <Box
        width='80vw'
        margin='auto'
        marginBottom={'100px'}>
      <Box
        display='flex'
        flexDir='row'>
        <Box
          padding={2}>
            <Image 
              borderRadius='50%'
              width={100}
              src='https://bit.ly/dan-abramov' 
              alt='Dan Abramov' />
        </Box>
        <Box
          marginBottom='20px'>
          <Box>
            <Heading color='white'>{`${property.brand} Brand Campaign`}</Heading>
          </Box>
          <Box>
          <Box
            display='flex'
            flexDir='row'
            padding={2}
            alignItems='center'>
            <FaGlobe color="white"/>
            <Text
              paddingLeft={2}
              color='white'>
                {`${property.website} `}
            </Text>
          </Box>
          <Box
            display='flex'
            flexDir='row'
            alignItems='center'
            padding={2}>
            <FaTwitter color="white" />
            <Text
              paddingLeft={2}
              color='white'>
              @tesla
            </Text> 
          </Box>
          </Box> 
        </Box>
      </Box>
      <Box
        marginBottom='50px'>
        <ReactPlayer 
          url={property.videoUrl}
          playing={true}
          loop={true}
          width='100%'/>
      </Box>
      <Box>
        <Heading
          marginBottom='20px'
          color='white'>
            Campaign Details
        </Heading>
        <Text
          marginBottom='50px'
          color='white'>
            {property.details}
        </Text>
      </Box>
      <Box
        marginBottom='20px'
        display='flex'
        flexDirection='row'
        justifyContent='space-between'>
        <Box>
          <Heading
            marginBottom='20px'
            color='white'>
              Capital    
          </Heading>
          <Heading
            marginBottom='20px'
            color='red'>
              {property.capital}
          </Heading>
        </Box>
        <CountDown
          title='Submission Deadline'
          time={property.submission}/>
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'>
        <CountDown 
          title='Voting Ends'
          time={property.voting}/>
        <CountDown 
          title='Decision'
          time={property.decision}/>
      </Box>
      </Box>
    </Content>
  );
}
