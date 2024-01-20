import React from 'react'

type ThemeContextType = {
    switchColorMode: () => void
}

export const ColorModeContext = React.createContext<ThemeContextType>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    switchColorMode: () => {},
})
