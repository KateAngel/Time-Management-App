/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import FormInput from '../components/FormInput'
import TypographyTitle from '../components/TypographyTitle'
import { useLoginUserMutation } from '../redux/api/authApi'
import { LoadingButtonPrimary as LoadingButton } from '../styles/loadingButtonStyled'
import { LinkItem } from '../styles/styled'

const loginSchema = object({
    email: string()
        .min(1, 'Email address is required')
        .email('Email Address is invalid'),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
})

export type LoginInput = TypeOf<typeof loginSchema>

const LoginPage = () => {
    const theme = useTheme()
    const isSMScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const methods = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    })

    // ? API Login Mutation
    const [loginUser, { isLoading, isError, error, isSuccess }] =
        useLoginUserMutation()

    const navigate = useNavigate()
    const location = useLocation()

    const from =
        ((location.state as any)?.from.pathname as string) || '/my-profile'

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods

    useEffect(() => {
        if (isSuccess) {
            toast.success('You successfully logged in')
            navigate(from)
        }
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
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

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful])

    const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
        // ? Executing the loginUser Mutation
        loginUser(values)
    }

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Box
                display="flex"
                flexDirection={isSMScreen ? 'column' : 'row'}
                sx={{
                    borderRadius: 1,
                    border: isSMScreen
                        ? 'none'
                        : `1px solid ${theme.palette.divider}`,
                    backgroundColor: isSMScreen
                        ? 'background.paper'
                        : 'inherit',
                }}
            >
                <Box
                    maxWidth={isSMScreen ? 'auto' : '25rem'}
                    sx={{
                        p: { xs: '2rem', sm: '3rem' },
                    }}
                >
                    <TypographyTitle
                        sx={{
                            fontSize: { xs: '1rem' },
                            mb: 2,
                        }}
                    />
                    <Typography
                        textAlign="center"
                        component="h1"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 600,
                            fontSize: { xs: '1rem', md: '2rem' },
                            mb: 2,
                            letterSpacing: 1,
                        }}
                    >
                        Welcome back
                    </Typography>
                    <Typography
                        variant="body1"
                        component="h2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.9rem',
                            mb: 2,
                        }}
                    >
                        By logging in you accept our ridiculously long terms
                        that you didn&apos;t bother to read
                    </Typography>
                </Box>
                <FormProvider {...methods}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmitHandler)}
                        noValidate
                        autoComplete="off"
                        maxWidth={isSMScreen ? 'auto' : '25rem'}
                        width="100%"
                        sx={{
                            p: { xs: '2rem', sm: '3rem' },
                            //borderRadius: 1,
                            //border: `1px solid ${theme.palette.divider}`,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <FormInput
                            name="email"
                            label="Email Address"
                            type="email"
                            //placeholder="email"
                        />
                        <FormInput
                            name="password"
                            label="Password"
                            type="password"
                            //placeholder="password"
                        />

                        <LoadingButton
                            variant="contained"
                            sx={{ mt: 2 }}
                            fullWidth
                            disableElevation
                            type="submit"
                            loading={isLoading}
                        >
                            Log in
                        </LoadingButton>

                        <Typography
                            sx={{
                                fontSize: '0.9rem',
                                mt: '1rem',
                                textAlign: 'center',
                            }}
                        >
                            Don&apos;t have an account?{' '}
                            <LinkItem to="/register">Sign Up Here</LinkItem>
                        </Typography>
                    </Box>
                </FormProvider>
            </Box>
        </Container>
    )
}

export default LoginPage
