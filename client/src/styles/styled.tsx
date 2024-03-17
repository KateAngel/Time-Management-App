import { Link, useNavigate } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import { Box, Typography, TypographyProps } from '@mui/material'

import '@fontsource/freckle-face'

interface TypographyTitleProps extends TypographyProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variant?: any
}

const TypographyTitle = ({
    variant = 'h4',
    sx: titleSx,
    ...otherProps
}: TypographyTitleProps) => {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
        <Typography
            variant={variant}
            onClick={() => navigate('/')}
            sx={{
                ml: 1,
                mr: 1,
                cursor: 'pointer',
                fontFamily: '"Freckle Face","system-ui"',
                color: theme.palette.text.primary,
                ...titleSx,
            }}
            {...otherProps}
        >
            Horae Harbor
            {/*Temporaire*/}
            {/*Time Tool*/}
            {/*Time Record*/}
            {/*tempus facilis*/}
        </Typography>
    )
}

export default TypographyTitle

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
