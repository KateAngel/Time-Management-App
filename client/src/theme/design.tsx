/* eslint-disable prettier/prettier */
import { Container, Typography } from '@mui/material'

import ColorPage from './colors.box'
import ExampleButtons from './example.buttons'
import ExampleIcons from './example.icons'
import Tint from './tint'



const DesignPage = () => {

    return (
        <Container>
            <Typography variant="h1">H1. Design Tools</Typography>
            <Typography variant="h2">H2. Colors</Typography>
            <ColorPage />
            <Typography variant="h2">H2. Tint</Typography>
            <Tint />
            <Typography variant="h2">H2. Buttons</Typography>
            <ExampleButtons />
            <Typography variant="h2">H2. Icons</Typography>
            <ExampleIcons />
            
        </Container>
    )
}

export default DesignPage
