import {
    TextField as _TextField,
    Typography as _Typography,
    TextFieldProps,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { FC } from 'react'

const Typography = styled(_Typography)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    maxWidth: '50rem',
    width: '100%',
    height: '100%',
})

const TextField = styled(_TextField)({
    width: '70%',
    textAlign: 'left',
})

type IFormProps = {
    name: string
} & TextFieldProps

const FormTextField: FC<IFormProps> = ({ name, ...otherProps }) => {
    const theme = useTheme()

    return (
        <Typography gutterBottom>
            <strong>{name}</strong>
            <TextField variant="filled" {...otherProps} />
        </Typography>
    )
}

export default FormTextField
