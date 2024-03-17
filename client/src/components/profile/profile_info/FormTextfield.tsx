import { TextField, Typography, TextFieldProps } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FC } from 'react'

type IFormProps = {
    name: string
} & TextFieldProps

const FormTextField: FC<IFormProps> = ({ name, ...otherProps }) => {
    const theme = useTheme()

    return (
        <Typography
            gutterBottom
            display="flex"
            alignItems="stretch"
            justifyContent="space-between"
            maxWidth="50rem"
            width="100%"
            height="100%"
            sx={{
                flexDirection: { xs: 'column', md: 'row' },
                fontSize: '12px',
            }}
        >
            <strong>{name}</strong>
            <TextField
                variant="filled"
                {...otherProps}
                sx={{ width: { xs: '100%', md: '70%' }, textAlign: 'left' }}
            />
        </Typography>
    )
}

export default FormTextField
