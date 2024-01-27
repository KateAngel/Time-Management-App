import { Box, Container, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/store'
import { LoadingButtonHeader as LoadingButton } from '../styles/loadingButtonStyled'
import { CommonBox } from '../styles/styled'

const HomePage = () => {
    const theme = useTheme()
    const navigate = useNavigate()

    const user = useAppSelector((state) => state.userState.user)

    return (
        <Container maxWidth="lg">
            <CommonBox
                sx={{
                    mt: '4rem',
                    height: '15rem',
                    backgroundColor: 'background.paper',
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        color: 'secondary.main',
                        fontWeight: 500,
                    }}
                >
                    Home Page
                </Typography>
                {user && (
                    <>
                        <Box sx={{ mr: 2 }}>
                            <Typography
                                variant="h2"
                                component="h1"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                }}
                            >
                                Welcome back, {user.name}
                            </Typography>
                        </Box>
                    </>
                )}
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
