import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { Typography, TypographyProps } from '@mui/material'

import '@fontsource/freckle-face'

interface TypographyTitleProps extends TypographyProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variant?: any
    fontSize?: string | number
}

const TypographyTitle = ({
    variant,
    sx: titleSx,
    color,
    fontSize,
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
                color: color || theme.palette.text.primary,
                fontSize: fontSize || '2.5rem',
                ...titleSx,
            }}
            {...otherProps}
        >
            Horae Harbor
            {/* Other name options:
            Prudentime
            Temporaire
            Time Tool
            Time Record
            Tempus Facilis*/}
        </Typography>
    )
}

export default TypographyTitle
