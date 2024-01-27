import {
    Box,
    Container,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import Home from '@mui/icons-material/Home'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

import * as React from 'react'

const data = [
    { icon: <Home />, label: 'Home' },
    { icon: <AccountBoxIcon />, label: 'Profile info' },
    { icon: <AssignmentSharpIcon />, label: 'My Tasks' },
    { icon: <CalendarMonthIcon />, label: 'My calendar' },
]

const ProfilePage = () => {
    const theme = useTheme()

    // const user = useAppSelector((state) => state.userState.user)
    const [open, setOpen] = React.useState(true)

    return (
        <Container maxWidth="lg">
            <Box
                maxWidth="15rem"
                sx={{
                    bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                    pb: open ? 2 : 0,
                }}
            >
                <ListItemButton
                    alignItems="flex-start"
                    onClick={() => setOpen(!open)}
                    sx={{
                        px: 3,
                        pt: 2.5,
                        pb: open ? 0 : 2.5,
                        '&:hover, &:focus': {
                            '& svg': { opacity: open ? 1 : 0 },
                        },
                    }}
                >
                    <ListItemText
                        primary="Profile Page"
                        primaryTypographyProps={{
                            fontSize: 15,
                            fontWeight: 'medium',
                            lineHeight: '20px',
                            mb: '2px',
                        }}
                        secondary="Home, Profile Info, Database, Storage"
                        secondaryTypographyProps={{
                            noWrap: true,
                            fontSize: 12,
                            lineHeight: '16px',
                            color: open
                                ? 'rgba(0,0,0,0)'
                                : 'rgba(255,255,255,0.5)',
                        }}
                        sx={{ my: 0 }}
                    />
                    <KeyboardArrowDown
                        sx={{
                            mr: -1,
                            opacity: 0,
                            transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                            transition: '0.2s',
                        }}
                    />
                </ListItemButton>
                {open &&
                    data.map((item) => (
                        <ListItemButton
                            key={item.label}
                            sx={{
                                py: 0,
                                minHeight: 32,
                                color: 'rgba(255,255,255,.8)',
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontSize: 14,
                                    fontWeight: 'medium',
                                }}
                            />
                        </ListItemButton>
                    ))}
            </Box>
        </Container>
    )
}

export default ProfilePage
