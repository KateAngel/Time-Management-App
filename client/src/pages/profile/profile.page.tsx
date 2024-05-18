import { Box, Container, Tab, Tabs } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuSharpIcon from '@mui/icons-material/MenuSharp'
import ArrowBackIosSharp from '@mui/icons-material/ArrowForwardIosSharp'
import LeaderboardSharpIcon from '@mui/icons-material/LeaderboardSharp'
import BarChartSharpIcon from '@mui/icons-material/BarChartSharp'
import HomeSharpIcon from '@mui/icons-material/HomeSharp'
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp'
import CategorySharpIcon from '@mui/icons-material/CategorySharp'
import CasesSharpIcon from '@mui/icons-material/CasesSharp'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp'

import * as React from 'react'
import { Link, Outlet } from 'react-router-dom'
// import { useAppSelector } from '../../redux/store'

const data = [
    { icon: <BarChartSharpIcon />, label: 'Dashboard', to: '/dashboard' },
    {
        icon: <AccountBoxSharpIcon />,
        label: 'Profile info',
        to: '/profile-info',
    },
    {
        icon: <CategorySharpIcon />,
        label: 'Project Categories',
        to: '/categories',
    },
    { icon: <CasesSharpIcon />, label: 'Projects', to: '/projects' },
    {
        icon: <AssignmentSharpIcon />,
        label: 'To-do List',
        to: '/to-do-list',
    },
    { icon: <CalendarMonthSharpIcon />, label: 'Calendar', to: '/calendar' },
]

const ProfilePage = () => {
    const theme = useTheme()
    // const user = useAppSelector((state) => state.userState.user)

    const [value, setValue] = React.useState(0)
    const [showIconsOnly, setShowIconsOnly] = React.useState(false)
    const tabsWidth = !showIconsOnly ? '56px' : '200px'

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const toggleShowIconsOnly = () => {
        setShowIconsOnly(!showIconsOnly)
    }

    return (
        <Container maxWidth="lg" sx={{ minHeight: 'calc(100% - 280px)' }}>
            <Box
                sx={{
                    mt: '4rem',
                    display: 'flex',
                }}
            >
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{
                        borderRight: 1,
                        borderColor: 'divider',
                        width: tabsWidth,
                        overflow: 'visible',
                    }}
                >
                    <Tab
                        icon={
                            showIconsOnly ? (
                                <MenuSharpIcon />
                            ) : (
                                <ArrowBackIosSharp />
                            )
                        }
                        onClick={toggleShowIconsOnly}
                        sx={{
                            justifyContent: !showIconsOnly
                                ? 'flex-start'
                                : 'flex-end',
                            gap: 1,
                            minHeight: 0,
                            textTransform: 'none',
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                        }}
                    />
                    {data.map((tab, index) => (
                        <Tab
                            key={index}
                            label={showIconsOnly ? tab.label : undefined}
                            icon={tab.icon}
                            iconPosition="start"
                            component={Link}
                            to={`/my-profile${tab.to}`}
                            sx={{
                                justifyContent: 'flex-start',
                                gap: 1,
                                minHeight: 0,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                        />
                    ))}
                </Tabs>
                <Box
                    sx={{
                        p: { xs: '1rem', sm: '2rem' },
                        borderRadius: 1,
                        width: `calc(100% - ${tabsWidth})`,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Container>
    )
}

export default ProfilePage
