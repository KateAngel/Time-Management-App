import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const LinkItem = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
        textDecoration: 'underline',
    },
}))

export const CommonBox = styled(Box)({
    marginTop: '4rem',
})
