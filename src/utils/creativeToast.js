import { useToast } from "@chakra-ui/react"

const CustomTransitions = cssTransition({
  enter: 'slideInUp',
  exit: 'slideIn',
  duration: [300, 100]
})

const DEFAULT_OPTIONS = {
  transition: CustomTransitions
}

const toast = useToast()

export const creativeToast = {
  dismiss: () => {
    toast.dismiss()
  },
  success: (message, options = DEFAULT_OPTIONS) => {
    toast.dismiss()
    toast.success(message, options)
  },
  error: (message, options = DEFAULT_OPTIONS) => {
    toast.dismiss()
    toast.error(message, options)
  },
  info: (message, options = DEFAULT_OPTIONS) => {
    toast.dismiss()
    toast.info(message, options)
  },
  warn: (message, options = DEFAULT_OPTIONS) => {
    toast.dismiss()
    toast.warn(message, options)
  }
}
