/* eslint-disable prettier/prettier */
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import AlarmIcon from '@mui/icons-material/Alarm'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import FloatingActionButtons from '../styles/FloatingActionButtons'
import ToggleButtonsMultiple from '../styles/ToggleButtons'
import ThemeSwitchButton from '../styles/ThemeSwitch'

const DesignPage = () => {
    return (
        <Container sx={{
            display: 'flex',

        }}
        >
            <Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                    <Button variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" disabled color="primary">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="add an alarm">
                        <AlarmIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                    </IconButton>
                </Stack>
                <FloatingActionButtons />
            </Box>
            <Box>
                <ThemeSwitchButton />
                <ToggleButtonsMultiple />
            </Box>

        </Container>
    )
}

export default DesignPage
