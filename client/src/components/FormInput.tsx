import {
    FormHelperText,
    Typography,
    FormControl,
    Input,
    InputProps,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FC, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type IFormInputProps = {
    name: string
    label: string
} & InputProps

const FormInput: FC<IFormInputProps> = ({ name, label, ...otherProps }) => {
    const theme = useTheme()

    const [isFocused, setIsFocused] = useState(false)

    const {
        control,
        formState: { errors },
    } = useFormContext()

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

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
                        sx={{
                            border: 'solid 1px',
                            borderColor: isFocused
                                ? 'primary.main'
                                : theme.palette.divider,
                            padding: '0.3rem 0.75rem',
                            fontSize: '0.875rem',
                            lineHeight: '1.25rem',
                            transition: 'border-color 0.2s ease-in-out',
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
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
