import { Stack, Input, Button, useToast, useColorModeValue } from '@chakra-ui/react'
import React, {useState} from 'react'
import { nanoid } from 'nanoid';


function AddAttributes({ addAttributes }) {
const toast = useToast()
const [value, setValue] = useState("")

function handleSubmit(e){
    e.preventDefault();

    if(value === ''){
        toast({
        title: "Please enter the text.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
      return;
    }
    const attribute = {
        id: nanoid(),
        text: value
    }

    addAttributes(attribute)
    setValue('')

}
    return (
        <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
            <Input
            mt={5} 
            value={value} 
            variant="outline" 
            type="text" 
            placeholder="Enter your Attributes..."
            color={useColorModeValue("gray.700", "gray.50")}
            onChange={(e)=>setValue(e.target.value)} />
            <Button colorScheme="teal" type="submit">Add Attribute</Button>
        </Stack>
        </form>
    )
}

export default AddAttributes