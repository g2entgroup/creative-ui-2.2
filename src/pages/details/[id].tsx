import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaGlobe, FaTwitter } from 'react-icons/fa'
import ReactPlayer from 'react-player/lazy'
import { CustomTooltip } from 'src/components/common/CustomTooltip'
import { CountDown } from '../../components/common/CountDown'

export default function Details() {
  const router = useRouter()

  const property = {
    videoUrl: 'https://youtu.be/wQlN0BVltZI',
    brand: 'Tesla',
    profile: 'https://bit.ly/dan-abramov',
    twitter: '@tesla',
    website: 'https://www.tesla.com',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu convallis sapien. Etiam aliquet semper justo nec posuere. Aliquam molestie efficitur quam quis bibendum. Aliquam sodales nisi consequat metus egestas eleifend. Morbi tincidunt ex a volutpat congue. Phasellus convallis scelerisque arcu ac mollis. Curabitur non mauris in quam hendrerit vehicula quis tempor nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras eu pretium sem. Quisque pellentesque posuere volutpat. Aenean non mauris eget tellus aliquet interdum ac non nibh. Sed non purus id mi ornare cursus quis quis lorem. Ut ut risus tincidunt, laoreet ex eu, tristique est. Sed at maximus nisl. Integer vulputate eget orci at lacinia. Donec gravida in urna non viverra. Sed ultricies laoreet fermentum. Praesent consectetur hendrerit lacus ut consectetur. Vestibulum pulvinar ac leo sit amet pharetra. Aenean id dictum dolor, ut vestibulum justo. Donec efficitur sit amet ligula in pellentesque.',
    submission: '2022-10-1',
    voting: '2022-04-2',
    decision: '2022-07-2',
    capital: '1000 USDC',
  }

  const goTo = () => {}

  return (
    <Box margin="auto" marginBottom={'100px'}>
      <Box
        display="flex"
        flexDir={['column', 'column', 'row', 'row']}
        margin={'auto'}
        minWidth={['80vw', '80vw', '60vw', '60vw']}
        maxWidth={['80vw', '80vw', '60vw', '60vw']}
        marginBottom="20px"
      >
        <Box padding={2}>
          <Image
            borderRadius="50%"
            width={100}
            src={property.profile}
            alt="Dan Abramov"
          />
        </Box>
        <Box marginBottom="20px">
          <Box>
            <Heading>{`${property.brand} Brand Campaign`}</Heading>
          </Box>
          <Box>
            <Box
              display="flex"
              cursor="pointer"
              flexDir="row"
              padding={2}
              alignItems="center"
            >
              <FaGlobe />
              <Text paddingLeft={2}>{`${property.website} `}</Text>
            </Box>
            <Box
              display="flex"
              cursor="pointer"
              flexDir="row"
              alignItems="center"
              padding={2}
            >
              <FaTwitter />
              <Text paddingLeft={2}>@tesla</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        margin={'auto'}
        minWidth={['90vw', '80vw', '60vw', '60vw']}
        maxWidth={['90vw', '80vw', '60vw', '60vw']}
        marginBottom="50px"
      >
        <ReactPlayer
          url={property.videoUrl}
          playing={true}
          loop={true}
          width="100%"
        />
      </Box>
      <Box
        margin={'auto'}
        minWidth={['90vw', '80vw', '60vw', '60vw']}
        maxWidth={['90vw', '80vw', '60vw', '60vw']}
        marginBottom="20px"
      >
        <Heading marginBottom="20px">Campaign Details</Heading>
        <Text marginBottom="50px">{property.details}</Text>
      </Box>
      <Box
        margin={'auto'}
        minWidth={['90vw', '80vw', '60vw', '60vw']}
        maxWidth={['90vw', '80vw', '60vw', '60vw']}
        marginBottom="20px"
        display="flex"
        width={'100vw'}
        flexDir={['column', 'column', 'column', 'row']}
        flexWrap={['nowrap', 'nowrap', 'nowrap', 'wrap']}
        justifyContent="space-between"
      >
        <Box>
          <Heading marginBottom="20px">
            <CustomTooltip label="lorem ipsum">Capital</CustomTooltip>
          </Heading>
          <Heading marginBottom="20px" color="red">
            {property.capital}
          </Heading>
        </Box>
        <CountDown
          title="Voting Ends"
          time={property.voting}
          tooltip="lorem ipsum"
        />
        <CountDown
          title="Decision"
          time={property.decision}
          tooltip="lorem ipsum"
        />
        <CountDown
          title="Submission Deadline"
          time={property.submission}
          tooltip="lorem ipsum"
        />
      </Box>
      <Box
        margin={'auto'}
        minWidth={['90vw', '80vw', '60vw', '60vw']}
        maxWidth={['90vw', '80vw', '60vw', '60vw']}
        marginBottom="20px"
        display="flex"
        flexDir={['column', 'column', 'row', 'row']}
        justifyContent={['space-evenly']}
      >
        <Button background="#e50168" color="white" margin={10}>
          Submit NFT
        </Button>
        <Button background="#e50168" color="white" margin={10}>
          Vote for Submission
        </Button>
      </Box>
    </Box>
  )
}
