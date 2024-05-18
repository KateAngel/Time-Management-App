import { Box, Container, Typography, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/store'
import {
    LoadingButtonHeader as LoadingButton,
    LoadingButtonPrimary,
} from '../styles/loadingButtonStyled'
import { CommonBox } from '../styles/styled'

const HomePage = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.userState.user)

    return (
        <Container maxWidth="lg" sx={{ minHeight: 'calc(100% - 280px)' }}>
            <CommonBox
                sx={{
                    mt: '4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem',
                }}
            >
                {user && (
                    <Typography
                        variant="h3"
                        component="h2"
                        gutterBottom
                        sx={{
                            color: 'text.secondary',
                            fontWeight: 500,
                            marginTop: '1rem',
                        }}
                    >
                        Welcome back, {user.name}!
                    </Typography>
                )}
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="body1"
                            component="p"
                            align="center"
                            gutterBottom
                            mt="2rem"
                            sx={{ color: 'text.primary' }}
                        >
                            Take control of your time and tasks with
                            HoraeHarbor, the ultimate time management
                            application. Organize your tasks by projects and
                            projects by categories, ensuring clarity and
                            efficiency in your workflow.
                        </Typography>
                        {!user && (
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mt="4rem"
                                mb="4rem"
                            >
                                <LoadingButtonPrimary
                                    onClick={() => navigate('/register')}
                                >
                                    Sign Up To Get Started
                                </LoadingButtonPrimary>
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                'assets/images/homePage5.jpg'
                            }
                            alt="HoraeHarbor"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: theme.shape.borderRadius,
                                overflow: 'hidden',
                            }}
                        />
                    </Grid>
                </Grid>
            </CommonBox>
            {/* <LoadingButton
                sx={{ borderColor: 'white', ml: 2 }}
                onClick={() => navigate('/design')}
            >
                Design Tools
            </LoadingButton> */}
        </Container>
    )
}

export default HomePage
