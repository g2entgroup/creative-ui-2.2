import { Switch, FormControl, FormLabel } from '@chakra-ui/react';

export default function Lock() {
    return (
        <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='filecoin-storage' mb='0'>
            Enable Filecoin Storage?
        </FormLabel>
        <Switch id='filecoin-storage' />
        </FormControl>
    )
}