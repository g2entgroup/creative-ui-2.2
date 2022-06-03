import React, { Component } from 'react';
//import { Image } from '@chakra-ui/react';
import Image from 'next/image';

const myLoader = ({ src, width }) => {
    return `https://res.cloudinary.com/${src}?w=${width}`
  }

export default class LogoModal extends Component {
    render() {
        return (
            <Image
                loader={myLoader} 
                src="dyangxc7h/image/upload/v1623552244/creative/Creative_logo.png"
                alt="Creative Logo"
                width={155}
                height={139}
                quality={75} 
            />
        )
    }
}
