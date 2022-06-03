import React from 'react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    CloseButton
  } from "@chakra-ui/react";

const SingleAlert = () => {
    return (
        <Alert status="success">
            <AlertIcon />
            <Box display="1">
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription display="block">
                Your application has been received. We will review your application and
                respond within the next 48 hours.
                </AlertDescription>
            </Box>
            <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
    )
}

export default SingleAlert
