import { Stack, Input, Button, useToast, useColorModeValue } from '@chakra-ui/react'
import React, {useState} from 'react'
import { nanoid } from 'nanoid';


function AddAttributes({ addAttributes }) {
const toast = useToast()
const [key, setKey] = useState("");
const [value, setValue] = useState("");

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
        property: key,
        text: value
    }

    addAttributes(attribute)
    setKey('')
    setValue('')

}
    return (
        <>
            <Stack direction={['column', 'row']} spacing={4}>
                <Input
                value={key} 
                variant="outline" 
                type="text" 
                placeholder="Background"
                color={useColorModeValue("gray.700", "gray.50")}
                onChange={(e) => setKey(e.target.value)} />
                <Input 
                value={value} 
                variant="outline" 
                type="text" 
                placeholder="Blue"
                color={useColorModeValue("gray.700", "gray.50")}
                onChange={(e)=>setValue(e.target.value)} />
            </Stack>
            <Stack spacing={4} mt={4}>
                <Button onClick={handleSubmit} colorScheme="teal">Add Attribute</Button>
            </Stack>
            
        </>
    )
}

export default AddAttributes