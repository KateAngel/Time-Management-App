import { Container, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useNavigate } from 'react-router-dom'
import { LoadingButtonHeader as LoadingButton } from '../styles/loadingButtonStyled'
import { CommonBox } from '../styles/styled'

const HomePage = () => {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
        <Container maxWidth="lg">
            <CommonBox
                sx={{
                    mt: '2rem',
                    height: '15rem',
                    backgroundColor: 'background.paper',
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                    }}
                >
                    Home Page
                </Typography>
            </CommonBox>
            <LoadingButton
                sx={{ borderColor: 'white', ml: 2 }}
                onClick={() => navigate('/design')}
            >
                Design Tools
            </LoadingButton>
        </Container>
    )
}

export default HomePage
