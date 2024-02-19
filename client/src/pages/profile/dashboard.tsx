// MyCalendar.tsx
import { Box, Container, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { TabTitleTypography } from '../../styles/profile.styles'

const Dashbord = () => {
    const theme = useTheme()

    return (
        <Container maxWidth="lg">
            <Box>
                <TabTitleTypography>My dashbord</TabTitleTypography>
            </Box>
        </Container>
    )
}

export default Dashbord
