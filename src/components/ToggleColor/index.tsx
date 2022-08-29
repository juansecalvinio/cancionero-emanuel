import React from 'react'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const ToggleColor = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={useColorModeValue("Modo oscuro", "Modo claro")}
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
    />
  )
}

export default ToggleColor