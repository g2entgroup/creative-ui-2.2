import React, { Component } from 'react';
//import { Image } from '@chakra-ui/react';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

const myLoader = ({ src, width }) => {
    return `https://res.cloudinary.com/${src}?w=${width}}`
  }

  export default class Hero extends Component {
    render() {
        return (
            <Box>
                <Image
                loader={myLoader}
                src='dyangxc7h/image/upload/v1623552244/creative/brands.jpg'
                alt="Creative Logo"
                width={1900}
                height={1800}
                />
            </Box>
        )
    }
}
