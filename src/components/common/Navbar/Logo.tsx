import React, { Component } from 'react';
//import { Image } from '@chakra-ui/react';
import Image from 'next/image';

export default class Logo extends Component {
    render() {
        return (
            <Image 
                src="https://res.cloudinary.com/dyangxc7h/image/upload/v1623552244/creative/Creative_logo.png"
                alt="Creative Logo"
                width={50}
                height={40} 
            />
        )
    }
}
