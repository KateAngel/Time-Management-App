/* eslint-disable prettier/prettier */
import { styled } from '@mui/material/styles'
import { LoadingButton as _LoadingButton } from '@mui/lab'

export const LoadingButtonHeader = styled(_LoadingButton)`
    padding: 0.4rem;
    margin-right: 1rem;
    text-transform: none;
`

export const LoadingButtonPrimary = styled(_LoadingButton)`
    padding: 0.6rem 0;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.contrastText};
    font-weight: bold;

    &:hover {
        background-color: ${(props) => props.theme.palette.primary.dark};
    }
`
export const LoadingButtonVerify = styled(_LoadingButton)`
    padding: 0.6rem 0;
    background-color: #f9d13e;
    color: #2363eb;
    font-weight: 500;

    &:hover {
        background-color: #ebc22c;
        transform: translateY(-2px);
    }
`

