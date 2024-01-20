/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import {
    AppBar,
    Box,
    Container,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'

export const LinkItem = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
        textDecoration: 'underline',
    },
}));

export const StyledAppBar = styled(AppBar)({
    backgroundColor: 'hsl(210 40% 98%)',
});
  
export const StyledToolbar = styled(Toolbar)({
    justifyContent: 'space-between',
});
  
export const StyledIconButton = styled(IconButton)({
    color: '#2363eb',
});
  
export const StyledTooltip = styled(Tooltip)({
    color: '#2363eb',
});

export const CommonContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});
  
export const CommonBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',  
});
  
export const CommonTypography = styled(Typography)({
    textAlign: 'center',
});
  
export const LinkItemCommon = styled(Link)({
    textDecoration: 'none',
    color: '#2363eb',
    '&:hover': {
      textDecoration: 'underline',
    },
});