/* eslint-disable prettier/prettier */
import React from 'react'
import { Box, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import { Colors } from './palette'
import ExamplePalette from './example.palette'

const ItemBox = styled(Box)({
    border: '1px solid grey',
    width: '150px',
    height: 50,
    marginRight: 2,
})

const darkModeColors = Colors('dark')

const lightModeColors = Colors('light')

interface ColorProps {
    name: string
    colorCode: string
}

const ColorBox: React.FC<ColorProps> = ({ name, colorCode }) => {
    return (
        <Box
            style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}
        >
            <Box
                style={{
                    width: 50,
                    height: 25,
                    backgroundColor: colorCode,
                    marginRight: 10,
                }}
            />
            <span>{name}</span>
        </Box>
    )
}

const ColorPage = () => {
    const theme = useTheme()

    return (
        <Box style={{ 
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid grey',
        }}>
            <Box style={{ marginRight: 20 }}>
                <h2>Dark Mode Colors</h2>
                {Object.entries(darkModeColors).map(([name, colorCode]) => (
                    <ColorBox
                        key={name}
                        name={name}
                        colorCode={colorCode as string}
                    />
                ))}
            </Box>
            <Box sx={{backgroundColor: Colors('light').body_bg, color: Colors('light').textPrimary}}>
                <h2>Light Mode Colors</h2>
                {Object.entries(lightModeColors).map(([name, colorCode]) => (
                    <ColorBox
                        key={name}
                        name={name}
                        colorCode={colorCode as string}
                    />
                ))}
            </Box>
            <Box 
                style={{ 
                    alignItems: 'center',
                    border: '1px solid grey'
                }}
            >
                <Typography variant="h2">H2. Palette</Typography>
                <ExamplePalette />
                <Typography variant="h2">H2. Bg and text</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid grey',
                    }}
                >
                    <Box>
                        <ItemBox
                            sx={{
                                backgroundColor: theme.palette.background.default,
                                color: theme.palette.text.primary,
                            }}
                        >
                            <Typography>background.default text.primary</Typography>
                        </ItemBox>
                        <ItemBox
                            sx={{
                                backgroundColor: theme.palette.background.default,
                                color: theme.palette.text.secondary,
                            }}
                        >
                            <Typography>
                                background.default text.secondary
                            </Typography>
                        </ItemBox>
                        <ItemBox
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                            }}
                        >
                            <Typography>background.paper text.primary</Typography>
                        </ItemBox>
                        <ItemBox
                            sx={{
                                backgroundColor: theme.palette.inputBG.main,
                                color: theme.palette.text.primary,
                            }}
                        >
                            <Typography>input.main text.primary</Typography>
                        </ItemBox>
                    </Box>
                    <Box
                        style={{
                            backgroundColor: theme.palette.background.default,
                            padding: '20px',
                        }}
                    >
                        <Typography
                            variant="h1"
                            style={{ color: theme.palette.primary.main }}
                        >
                            h1 Primary
                        </Typography>
                        <Typography
                            variant="h2"
                            style={{ color: theme.palette.secondary.main }}
                        >
                            h2 Secondary
                        </Typography>
                        <Typography
                            variant="h3"
                            style={{ color: theme.palette.text.primary }}
                        >
                            h3 Text Primary
                        </Typography>
                        <Typography
                            variant="h4"
                            style={{ color: theme.palette.text.secondary }}
                        >
                            h4 Text Secondary
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ColorPage
