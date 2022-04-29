import { Box } from "@chakra-ui/react";
import { TransactionsList } from '../components/common/Navbar/Transactions/History';

export default function Activity() {
    return (
        <Box
        display='flex'
        minW='100vw'
        maxW='100vw'
        flexDir={['column','column','row', 'row']}
        alignItems={['center','center','flex-start', 'flex-start']}
        justifyContent={['center','center','flex-start', 'flex-start']}
        flexWrap={['nowrap', 'nowrap', 'wrap', 'wrap']}
        >
            <TransactionsList />
        </Box>
    )
}