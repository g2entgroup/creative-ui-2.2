import { Box, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import { CustomTooltip } from './CustomTooltip'

export const CountDown = ({
  title,
  time,
  tooltip,
}: {
  title: string
  time: string
  tooltip: string
}) => {
  //const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());
  const [year] = React.useState(new Date().getFullYear())
  const [days, setDays] = React.useState(0)
  const [hours, setHours] = React.useState(0)
  const [minutes, setMinutes] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)

  React.useEffect(() => {
    setTimeout(() => {
      calculateTimeLeft()
    }, 1000)
  })

  const calculateTimeLeft = () => {
    const difference = +new Date(time) - +new Date()

    if (difference > 0) {
      //timeLeft = {
      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)))
      setHours(Math.floor((difference / (1000 * 60 * 60)) % 24))
      setMinutes(Math.floor((difference / 1000 / 60) % 60))
      setSeconds(Math.floor((difference / 1000) % 60))
    }
  }

  return (
    <Box
      minWidth={['100%', '100%', '100%', '50%']}
      maxWidth={['100%', '100%', '100%', '50%']}
    >
      <Heading>
        <CustomTooltip label={tooltip}>{title}</CustomTooltip>
      </Heading>
      <HStack spacing="24px">
        <Box display="flex" flexDirection="column">
          <Box>
            <Heading as="h6">{`${days} :`}</Heading>
          </Box>
          <Box>
            <Heading as="h6" size="xs" color="red">
              days
            </Heading>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box>
            <Heading as="h6">{`${hours} :`}</Heading>
          </Box>
          <Box>
            <Heading as="h6" size="xs" color="red">
              hours
            </Heading>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box>
            <Heading as="h6">{`${minutes} :`}</Heading>
          </Box>
          <Box>
            <Heading as="h6" size="xs" color="red">
              minutes
            </Heading>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box>
            <Heading as="h6">{`${seconds} `}</Heading>
          </Box>
          <Box>
            <Heading as="h6" size="xs" color="red">
              seconds
            </Heading>
          </Box>
        </Box>
      </HStack>
    </Box>
  )
}
