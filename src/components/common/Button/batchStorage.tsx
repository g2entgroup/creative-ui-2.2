import { Button } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

export default function BatchStorage ({onClick}) {
    return(
        <>
            <Button size={"md"} leftIcon={<LockIcon />} colorScheme='pink' variant='solid' onClick={onClick}>
                Batch Filecoin Storage
            </Button>
        </>
    )
}