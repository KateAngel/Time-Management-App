/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

import FormInput from '../components/FormInput'
import TypographyTitle from '../styles/styled'
import { useRegisterUserMutation } from '../redux/api/authApi'
import { LoadingButtonPrimary as LoadingButton } from '../styles/loadingButtonStyled'
import { LinkItem } from '../styles/styled'

const registerSchema = object({
    email: string()
        .min(1, 'Email address is required')
        .email('Email Address is invalid'),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
})

export type RegisterInput = TypeOf<typeof registerSchema>

const RegisterPage = () => {
    const theme = useTheme()
    const isSMScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    })

    // ? Calling the Register Mutation
    const [registerUser, { isLoading, isSuccess, error, isError }] =
        useRegisterUserMutation()

    const navigate = useNavigate()

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods

    useEffect(() => {
        if (isSuccess) {
            toast.success('User registered successfully')
            navigate('/verifyemail')
        }

        if (isError) {
            // eslint-disable-next-line no-console
            console.log(error)
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

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        // ? Executing the RegisterUser Mutation
        registerUser(values)
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
                    <Typography
                        textAlign="center"
                        component="h1"
                        sx={{
                            color: 'primary.main',
                            fontSize: { xs: '1rem', md: '2rem' },
                            fontWeight: 600,
                            letterSpacing: 1,
                        }}
                    >
                        Welcome to
                    </Typography>
                    <TypographyTitle textAlign="center" />
                    <Typography
                        component="h2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.9rem',
                            mb: 2,
                            mt: 4,
                        }}
                    >
                        Create your account to get started!
                    </Typography>
                </Box>

                <FormProvider {...methods}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmitHandler)}
                        noValidate
                        autoComplete="off"
                        maxWidth="25rem"
                        width="100%"
                        sx={{
                            p: { xs: '2rem', sm: '3rem' },
                            borderRadius: 1,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <FormInput
                            name="email"
                            label="Email Address"
                            type="email"
                        />
                        <FormInput
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <FormInput
                            name="passwordConfirm"
                            label="Confirm Password"
                            type="password"
                        />

                        <LoadingButton
                            variant="contained"
                            sx={{ mt: 2 }}
                            fullWidth
                            disableElevation
                            type="submit"
                            loading={isLoading}
                        >
                            Sign Up
                        </LoadingButton>
                        <Typography
                            sx={{
                                fontSize: '0.9rem',
                                mt: '1rem',
                                textAlign: 'center',
                            }}
                        >
                            Already have an account?{' '}
                            <LinkItem to="/login">Log in</LinkItem>
                        </Typography>
                    </Box>
                </FormProvider>
            </Box>
        </Container>
    )
}

export default RegisterPage
