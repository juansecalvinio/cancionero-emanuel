import React from 'react'
import { Button, useColorMode } from '@chakra-ui/react'

const ToggleColor = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? "Dark" : "Light"}
    </Button>
  )
}

export default ToggleColor