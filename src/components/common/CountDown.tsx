import React from "react";
import { Heading, HStack, Box, Container } from "@chakra-ui/react";

export const CountDown = ({ title, time }:{ title: string, time: string }) => {
    //const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());
    const [year] = React.useState(new Date().getFullYear());
    const [days, setDays] = React.useState(0)
    const [hours, setHours] = React.useState(0)
    const [minutes, setMinutes] = React.useState(0)
    const [seconds, setSeconds] = React.useState(0)

    React.useEffect(() => {
        setTimeout(() => {
          calculateTimeLeft();
        }, 1000);
    });

    const calculateTimeLeft = () => {
        const difference = +new Date(time) - +new Date();
    
        if (difference > 0) {
          //timeLeft = {
            setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
            setMinutes(Math.floor((difference / 1000 / 60) % 60));
            setSeconds(Math.floor((difference / 1000) % 60));
        }
    };

    return (
        <Box
            minW={400}
            maxW={400}>
            <Heading
                color='white'>
                {title}
            </Heading>
            <HStack spacing='24px'>
                <Box
                    display='flex'
                    flexDirection='column'>
                    <Box>
                        <Heading
                            as='h6' 
                            color='white'>
                            {`${days} :`}
                        </Heading>
                    </Box>
                    <Box>
                        <Heading
                            as='h6' 
                            size='xs'
                            color='red'>
                            days
                        </Heading>
                    </Box>
                </Box>
                <Box    
                    display='flex'
                    flexDirection='column'>
                    <Box>
                        <Heading
                            as='h6' 
                            color='white'>
                            {`${hours} :`}
                        </Heading>
                    </Box>
                    <Box>
                        <Heading
                            as='h6' 
                            size='xs'
                            color='red'>
                            hours
                        </Heading>
                    </Box>
                </Box>
                <Box
                    display='flex'
                    flexDirection='column'>
                    <Box>
                        <Heading
                            as='h6' 
                            color='white'>
                            {`${minutes} :`}
                        </Heading>
                    </Box>
                    <Box>
                        <Heading
                            as='h6' 
                            size='xs'
                            color='red'>
                            minutes
                        </Heading>
                    </Box>
                </Box>
                <Box
                    display='flex'
                    flexDirection='column'>
                    <Box>
                        <Heading
                            as='h6' 
                            color='white'>
                            {`${seconds} `}
                        </Heading>
                    </Box>
                    <Box>
                        <Heading
                            as='h6' 
                            size='xs'
                            color='red'>
                            seconds
                        </Heading>
                    </Box>
                </Box>
            </HStack>
        </Box>
    )
}