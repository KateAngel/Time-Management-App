import { Box, Container, Tab, Tabs } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Home from '@mui/icons-material/Home'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

import * as React from 'react'
// import { useAppSelector } from '../../redux/store'
import ProfileInfo from './profile.info.page'

const data = [
    { icon: <Home />, label: 'Home' },
    { icon: <AccountBoxIcon />, label: 'Profile info' },
    { icon: <AssignmentSharpIcon />, label: 'My Tasks' },
    { icon: <CalendarMonthIcon />, label: 'My calendar' },
]

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props
    const theme = useTheme()

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                    sx={
                        {
                            // backgroundColor: theme.palette.background.paper,
                        }
                    }
                >
                    {children}
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const ProfilePage = () => {
    const theme = useTheme()

    // const user = useAppSelector((state) => state.userState.user)

    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    mt: '4.25rem',
                    flexGrow: 1,
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
                    }}
                >
                    {data.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            icon={tab.icon}
                            iconPosition="start"
                            sx={{
                                justifyContent: 'flex-start',
                                gap: 1,
                                minHeight: 0,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
                {data.map((tab, index) => (
                    <TabPanel key={index} value={value} index={index}>
                        {(() => {
                            switch (index) {
                                case 0:
                                    return 'Home'
                                case 1:
                                    return <ProfileInfo />
                                case 2:
                                    return 'Tasks'
                                case 3:
                                    return 'Calendar'
                                default:
                                    return `Item ${index + 1}`
                            }
                        })()}
                    </TabPanel>
                ))}
            </Box>
        </Container>
    )
}

export default ProfilePage
