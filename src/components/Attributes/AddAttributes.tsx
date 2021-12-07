import { Stack, Input, Button, useToast, useColorModeValue } from '@chakra-ui/react'
import React, {useState} from 'react'
import { nanoid } from 'nanoid';


function AddAttributes({ addAttributes }) {
const toast = useToast()
const [value, setValue] = useState("")

function handleSubmit(e){
    e.preventDefault();
    console.log("submitted!!")
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
        
        <Stack spacing={5}>
            <Input
            mt={5} 
            value={value} 
            variant="outline" 
            type="text" 
            placeholder="Enter your Attributes..."
            color={useColorModeValue("gray.700", "gray.50")}
            onChange={(e)=>setValue(e.target.value)} />
            <Button onClick={handleSubmit} colorScheme="teal">Add Attribute</Button>
        </Stack>

    )
}

export default AddAttributes