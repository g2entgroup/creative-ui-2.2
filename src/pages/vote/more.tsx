  import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import date  from 'date.js';

export default function More() {
  const router = useRouter()
  const {end, start, title, body} = router.query
  const [selection, setSelection] = React.useState([false, false, false])

  React.useEffect(() => {
    console.log()
  })

  return (
    <Box
      display='flex'
      flexDirection='row'
      flexWrap={'wrap'}>
      <Box
        flex={1}>
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
      </Box>
      <Box>
        <Box
          padding={5}>
          <Box  
            display='flex'
            flexDirection='row'>
            <Text>{`start date: ${date(`${start}`)}`}</Text>
          </Box>
          <Box
            display='flex'
            flexDirection='row'>
          <Text>{`end date: ${date(`${end}`)}`}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
