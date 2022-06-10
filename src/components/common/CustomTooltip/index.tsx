import { Tooltip } from '@chakra-ui/react'

export const CustomTooltip = ({ label, children }) => {
  return (
    <Tooltip
      label={label ? label : 'lorem ipsum'}
      placement="right"
      hasArrow
      arrowSize={6}
      bg="#D32F2F"
      color="white"
    >
      {children}
    </Tooltip>
  )
}
