/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Toolbar,
    Tooltip,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAppSelector } from '../redux/store'
import { useLogoutUserMutation } from '../redux/api/authApi'
import ThemeSwitchButton from '../styles/ThemeSwitch'
import {
    LoadingButtonHeader as LoadingButton,
    LoadingButtonPrimary,
} from '../styles/loadingButtonStyled'
import TypographyTitle from './TypographyTitle'

const Header = () => {
    const theme = useTheme()

    const navigate = useNavigate()
    const user = useAppSelector((state) => state.userState.user)

    const [logoutUser, { isLoading, isSuccess, error, isError }] =
        useLogoutUserMutation()

    useEffect(() => {
        if (isSuccess) {
            // window.location.href = '/login';
            navigate('/login')
        }

        if (isError) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (Array.isArray((error as any).data.error)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any

                ;(error as any).data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    }),
                )
            } else {
                toast.error((error as any).data.message, {
                    position: 'top-right',
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    const onLogoutHandler = async () => {
        logoutUser()
    }

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <TypographyTitle />
                    <Box display="flex" sx={{ ml: 'auto' }}>
                        {!user && (
                            <>
                                <LoadingButton
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </LoadingButton>
                                <LoadingButtonPrimary
                                    sx={{
                                        mr: 2,
                                    }}
                                    onClick={() => navigate('/register')}
                                >
                                    Sign Up
                                </LoadingButtonPrimary>
                            </>
                        )}
                        {user && (
                            <LoadingButton
                                sx={{ backgroundColor: '#eee' }}
                                onClick={onLogoutHandler}
                                loading={isLoading}
                            >
                                Logout
                            </LoadingButton>
                        )}
                        {user && user?.role === 'admin' && (
                            <LoadingButton
                                sx={{ backgroundColor: '#eee', ml: 2 }}
                                onClick={() => navigate('/admin')}
                            >
                                Admin
                            </LoadingButton>
                        )}
                        {/* <Box sx={{ ml: 4 }}>
                            <Tooltip
                                title="Post settings"
                                onClick={() => navigate('/profile')}
                            >
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        */}
                    </Box>

                    <ThemeSwitchButton />
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
