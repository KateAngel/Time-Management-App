/* eslint-disable prettier/prettier */
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import {
    LoadingButtonPrimary,
    LoadingButtonHeader,
    LoadingButtonVerify,
} from '../styles/loadingButtonStyled'

const PrimaryButton = styled(Button)`
    background-color: #007bff;
    color: #fff;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        background-color: #003d80;
    }

    &:disabled {
        background-color: #b3b3b3;
        color: #fff;
    }
`

const ExampleButtons = () => {

    return (
        <Container>
            <Box
                sx={{
                    mt: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box m={2}>
                    <Stack spacing={2} direction="row">
                        <Button variant="text">Text</Button>
                        <Button variant="contained">Contained</Button>
                        <Button variant="outlined">Outlined</Button>
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <Button>Primary</Button>
                        <Button disabled>Disabled</Button>
                        <Button href="#text-buttons">Link</Button>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button color="secondary">Secondary</Button>
                        <Button variant="contained" color="success">
                            Success
                        </Button>
                        <Button variant="outlined" color="error">
                            Error
                        </Button>
                    </Stack>
                </Box>
                <Box m={2}>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" disabled>
                            Contained Disabled
                        </Button>
                        <Button variant="contained" href="#contained-buttons">
                            Contained Link
                        </Button>
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" disabled>
                            Outlined Disabled
                        </Button>
                        <Button variant="outlined" href="#outlined-buttons">
                            Outlined Link
                        </Button>
                    </Stack>
                </Box>
            </Box>
            <div>
                <PrimaryButton>PrimaryButton</PrimaryButton>
                <LoadingButtonPrimary>
                    LoadingButtonRegister
                </LoadingButtonPrimary>
                <LoadingButtonHeader>LoadingButtonHeader</LoadingButtonHeader>
                <LoadingButtonVerify>LoadingButtonVerify</LoadingButtonVerify>
            </div>
        </Container>
    )
}

export default ExampleButtons
