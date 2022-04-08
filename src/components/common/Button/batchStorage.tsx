import { Button } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

export default function BatchStorage () {
    return(
        <>
            <Button size={"md"} leftIcon={<LockIcon />} colorScheme='pink' variant='solid'>
                Batch Filecoin Storage
            </Button>
        </>
    )
}