import { useState } from 'react'
import { createContainer } from 'unstated-next'

export const useStore = () => {
  const [value1, setValue1] = useState(0)

  const handleValue1 = (val) => {
    setValue1(val)
  }

  return {
    value1,
    handleValue1,
  }
}

export const StoreContainer = createContainer(useStore)
