import {
    FormHelperText,
    Typography,
    FormControl,
    Input as _Input,
    InputProps,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const Input = styled(_Input)`
    background-color: ${(props) => props.theme.palette.inputBG.main};

    padding: 0.3rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
`

type IFormInputProps = {
    name: string
    label: string
} & InputProps

const FormInput: FC<IFormInputProps> = ({ name, label, ...otherProps }) => {
    const theme = useTheme()

    const {
        control,
        formState: { errors },
    } = useFormContext()

    return (
        <Controller
            control={control}
            defaultValue=""
            name={name}
            render={({ field }) => (
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.primary,
                            mb: 0.5,
                            fontWeight: 500,
                        }}
                    >
                        {label}
                    </Typography>
                    <Input
                        {...field}
                        fullWidth
                        disableUnderline
                        error={!!errors[name]}
                        {...otherProps}
                    />
                    <FormHelperText error={!!errors[name]}>
                        {errors[name] !== undefined
                            ? (errors?.[name]?.message as React.ReactNode)
                            : ''}
                    </FormHelperText>
                </FormControl>
            )}
        />
    )
}

export default FormInput
