/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Typography } from '@mui/material'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '../components/FormInput'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useVerifyEmailMutation } from '../redux/api/authApi'
import { LoadingButtonVerify as LoadingButton } from '../styles/loadingButtonStyled'

const verificationCodeSchema = object({
    verificationCode: string().min(1, 'Verification code is required'),
})

export type VerificationCodeInput = TypeOf<typeof verificationCodeSchema>

const EmailVerificationPage = () => {
    const { verificationCode } = useParams()

    const methods = useForm<VerificationCodeInput>({
        resolver: zodResolver(verificationCodeSchema),
    })

    // ? API Login Mutation
    const [verifyEmail, { isLoading, isSuccess, data, isError, error }] =
        useVerifyEmailMutation()

    const navigate = useNavigate()

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods

    useEffect(() => {
        if (verificationCode) {
            reset({ verificationCode })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
            navigate('/login')
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

    const onSubmitHandler: SubmitHandler<VerificationCodeInput> = ({
        verificationCode,
    }) => {
        // ? Executing the verifyEmail Mutation
        verifyEmail({ verificationCode })
    }

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#2363eb',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    textAlign="center"
                    component="h1"
                    sx={{
                        color: '#f9d13e',
                        fontWeight: 600,
                        fontSize: { xs: '2rem', md: '3rem' },
                        mb: 2,
                        letterSpacing: 1,
                    }}
                >
                    Verify Email Address
                </Typography>

                <FormProvider {...methods}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmitHandler)}
                        noValidate
                        autoComplete="off"
                        maxWidth="27rem"
                        width="100%"
                        sx={{
                            backgroundColor: '#e5e7eb',
                            p: { xs: '1rem', sm: '2rem' },
                            borderRadius: 2,
                        }}
                    >
                        <FormInput
                            name="verificationCode"
                            label="Verification Code"
                        />

                        <LoadingButton
                            variant="contained"
                            sx={{ mt: 1 }}
                            fullWidth
                            disableElevation
                            type="submit"
                            loading={isLoading}
                        >
                            Verify Email
                        </LoadingButton>
                    </Box>
                </FormProvider>
            </Box>
        </Container>
    )
}

export default EmailVerificationPage
