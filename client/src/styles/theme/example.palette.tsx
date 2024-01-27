/* eslint-disable prettier/prettier */
import { Box, Container} from '@mui/material'

import { styled } from '@mui/material/styles'
import { getDesignTokens } from './theme'

const FlexBox_mb2 = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
})

const ColorBox = styled(Box)({
    width: 120,
    height: 25,
    marginRight: 2,
})

const ExamplePalette = () => {
    const PaletteLight = getDesignTokens('light').palette
    const PaletteDark = getDesignTokens('dark').palette

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    border: '1px solid grey',
                }}
            >
                {/* Dark*/}
                <Box style={{ marginRight: 20 }}>
                    <h2>Dark Mode Colors</h2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                height: 50,
                                backgroundColor: PaletteDark.background.default,
                            }}
                        >
                            <FlexBox_mb2 sx={{flexDirection: 'column'}}>
                                <span style={{color: PaletteDark.text.primary}}>text.primary</span>
                                <span style={{color: PaletteDark.text.secondary}}>text.secondary</span>
                            </FlexBox_mb2>       
                        </ColorBox>
                        <span>background.default</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteDark.background.paper,
                            }}
                        />
                        <span>background.paper</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteDark.primary.main,
                            }}
                        />
                        <span>primary.main</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteDark.secondary.main,
                            }}
                        />
                        <span>secondary.main</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteDark.error.main,
                            }}
                        />
                        <span>error.main</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteDark.warning.main,
                            }}
                        />
                        <span>warning.main</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteDark.divider,
                            }}
                        />
                        <span>divider</span>
                    </FlexBox_mb2>
                </Box>
                {/* Light*/}
                <Box>
                    <h2>Light Mode Colors</h2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                height: 50,
                                backgroundColor:
                                    PaletteLight.background.default,
                            }}
                        >
                            <FlexBox_mb2 sx={{flexDirection: 'column'}}>
                                <span style={{color: PaletteLight.text.primary}}>text.primary</span>
                                <span style={{color: PaletteLight.text.secondary}}>text.secondary</span>
                            </FlexBox_mb2>       
                        </ColorBox>
                        <span>background.default</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteLight.background.paper,
                            }}
                        />
                        <span>background.paper</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteLight.primary.main,
                            }}
                        />
                        <span>primary.main</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteLight.secondary.main,
                            }}
                        />
                        <span>secondary.main</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteLight.error.main,
                            }}
                        />
                        <span>error.main</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteLight.warning.main,
                            }}
                        />
                        <span>warning.main</span>
                    </FlexBox_mb2>
                    <FlexBox_mb2>
                        <ColorBox
                            sx={{
                                backgroundColor: PaletteLight.divider,
                            }}
                        />
                        <span>divider</span>
                    </FlexBox_mb2>
                </Box>
            </Box>
        </Container>
    )
}

export default ExamplePalette
