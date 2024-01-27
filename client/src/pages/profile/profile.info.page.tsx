/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable padding-line-between-statements */
import React, { useState, useEffect } from 'react'
import {
    Avatar,
    Box,
    Container,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material'
import { toast } from 'react-toastify'
import { useUpdateUserMutation } from '../../redux/api/userApi'
import { useAppSelector } from '../../redux/store'
import FormTextField from '../../components/FormTextfield'
import { LoadingButtonPrimary as LoadingButton } from '../../styles/loadingButtonStyled'

const ProfileInfo = () => {
    const user = useAppSelector((state) => state.userState.user)
    const [editing, setEditing] = useState(false)
    const [newName, setNewName] = useState(user?.name || '')
    const [newAge, setNewAge] = useState(user?.age || '')

    const handleNameChange = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setNewName(event.target.value)
    }

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAge(Number(event.target.value))
    }

    const [updateUser, { isLoading, isSuccess, error, isError }] =
        useUpdateUserMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success('User editted successfully')
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

    const handleSaveChanges = async () => {
        try {
            await updateUser({ name: newName, age: Number(newAge) })

            setEditing(false)
        } catch (error) {
            console.error('Error saving changes:', error)
        }
    }

    return (
        <Container maxWidth="lg">
            <Box
                component="form"
                noValidate
                autoComplete="off"
                minWidth="37rem"
                width="100%"
                sx={{
                    p: { xs: '1rem', sm: '2rem' },
                    borderRadius: 1,
                }}
            >
                <Typography
                    gutterBottom
                    textAlign="center"
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: 600,
                        fontSize: { xs: '1rem', md: '2rem' },
                        letterSpacing: 1,
                    }}
                >
                    Profile Info
                </Typography>
                <Typography
                    gutterBottom
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="1rem"
                    maxWidth="50rem"
                    width="100%"
                    height="100%"
                >
                    <strong>Profile picture</strong>
                    <Box width="70%" display="flex" justifyContent="center">
                        <Tooltip
                            title="Change picture"
                            placement="bottom-start"
                        >
                            <IconButton sx={{ p: 0 }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                    sx={{ width: '10rem', height: '10rem' }}
                                >
                                    HH
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Typography>
                <FormTextField disabled name="Id" value={user?.id || ''} />
                <FormTextField
                    disabled
                    name="Email Address"
                    value={user?.email || ''}
                />
                <FormTextField disabled name="Role" value={user?.role || ''} />
                <FormTextField
                    disabled
                    name="Registration date"
                    value={
                        user?.created_at
                            ? new Date(user.created_at).toLocaleDateString(
                                  'en-GB',
                                  { timeZone: 'UTC' },
                              )
                            : 'N/A' || ''
                    }
                />
                <FormTextField
                    name="Name"
                    label="Enter your name"
                    value={editing ? newName : user?.name || ''}
                    onChange={handleNameChange}
                    disabled={!editing}
                />
                <FormTextField
                    name="Age"
                    label="Enter your age"
                    value={editing ? newAge : user?.age || ''}
                    onChange={handleAgeChange}
                    disabled={!editing}
                />
                <Box
                    display="flex"
                    justifyContent="center"
                    gap="1rem"
                    ml="30%"
                    mt="1rem"
                >
                    <Tooltip title="Edit personal info" placement="top-start">
                        <LoadingButton
                            sx={{ p: 0 }}
                            onClick={() => {
                                setEditing(true)
                            }}
                        >
                            Edit
                        </LoadingButton>
                    </Tooltip>
                    <Tooltip title="Save changes" placement="top-start">
                        <LoadingButton
                            sx={{ p: 0 }}
                            onClick={handleSaveChanges}
                        >
                            Save
                        </LoadingButton>
                    </Tooltip>
                </Box>
            </Box>
        </Container>
    )
}

export default ProfileInfo
