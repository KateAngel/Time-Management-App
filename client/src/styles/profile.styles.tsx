import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import {
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
    TypographyProps,
} from '@mui/material'

export const TabTitleTypography = (props: TypographyProps) => {
    return (
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
            {...props}
        />
    )
}

export const LinkItem = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
        textDecoration: 'underline',
    },
}))

export const StyledToolbar = styled(Toolbar)({
    justifyContent: 'space-between',
})

export const StyledIconButton = styled(IconButton)({
    color: '#2363eb',
})

export const StyledTooltip = styled(Tooltip)({
    color: '#2363eb',
})

export const LinkItemCommon = styled(Link)({
    textDecoration: 'none',
    color: '#2363eb',
    '&:hover': {
        textDecoration: 'underline',
    },
})
