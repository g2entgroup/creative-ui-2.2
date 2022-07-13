import React from 'react';
import { Box, Slider, SliderTrack, SliderFilledTrack, Text } from "@chakra-ui/react";

export const Voting = (
    {
        choices, 
        score,
        scores
    }:{
        choices: any,
        score?: any, 
        scores?: any
    }) => {
    const [numberArray, setNumberArray] = React.useState(0);

    const getTotal = (index): number => {
        if(scores[index] && scores[index] != 0 && score){
            return (scores[index]/score)*100
        }

        return 0;
    }

    return(
      <>
        {
            choices.map((item: any, index) => {
                const number = getTotal(index)
                return (  
                    <Box
                        key={item}
                        display='flex'
                        flexDirection='column'
                        marginTop={4}
                        cursor='pointer'>
                        <Text>
                            {item}
                        </Text>
                        <Slider
                            value={number}
                            marginTop={4} 
                            aria-label='slider-ex-6'>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                        </Slider>
                </Box>
            )
              })
        }
      </>
    )
  }