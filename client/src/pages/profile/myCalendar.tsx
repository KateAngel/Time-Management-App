// MyCalendar.tsx
import { Box, Container, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { TabTitleTypography } from '../../styles/profile.styles'

const MyCalendar = () => {
    const theme = useTheme()

    return (
        <Container maxWidth="lg">
            <Box>
                <TabTitleTypography>Calendar</TabTitleTypography>
            </Box>
        </Container>
    )
}

export default MyCalendar
