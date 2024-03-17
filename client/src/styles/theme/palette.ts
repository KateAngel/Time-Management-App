/* eslint-disable prettier/prettier */
import { PaletteMode } from '@mui/material'

import { MODES } from './modes'

export const Colors = (mode: PaletteMode) => ({
    ...(mode === MODES.LIGHT
        ? {
              body_bg: 'hsl(0,0%,100%)',
              bg_paper: 'hsl(47,66%,94%)',
              textPrimary: 'hsl(0,0%,0%)',
              primaryMain: 'hsl(42,80%,53%)',
              primaryLight: 'hsl(42,80%,81%)',
              primaryDark: 'hsl(42,80%,48%)',
              primary_contrastText: 'hsl(0, 0%, 0%)',
              secondaryMain: 'hsl(175,25%,28%)',
              secondaryLight: 'hsl(175, 35%, 35%)',
              secondaryDark: 'hsl(175, 25%, 19%)',
              secondary_contrastText: 'hsl(42,80%,58%)',
              textSecondary: 'hsl(0,0%,33%)',
              inputBG: 'hsl(47,80%,89%)',
              muted: 'hsl(0,0%,83%)',
              divider: 'hsl(47,80%,73%)',
              actionHover: 'hsl(34,90%,94%)',
              inverse: '#2F3D4A',
              shaft: '#333',
          }
        : {
              body_bg: 'hsl(0, 0%, 0%)',
              bg_paper: 'hsl(0, 0%, 10%)',
              textPrimary: 'hsl(0,0%,100%)',
              primaryMain: 'hsl(42,80%,53%)',
              primaryLight: 'hsl(42,80%,81%)',
              primaryDark: 'hsl(42,80%,48%)',
              primary_contrastText: 'hsl(0, 0%, 5%)',
              secondaryMain: 'hsl(175,25%,28%)',
              secondaryLight: 'hsl(175, 35%, 35%)',
              secondaryDark: 'hsl(175, 25%, 19%)',
              secondary_contrastText: 'hsl(42,80%,58%)',            
              textSecondary: 'hsl(0,0%,53%)',
              inputBG: 'hsl(0,0%,19%)',
              muted: 'hsl(0, 0%, 33%)',
              divider: 'hsl(0,0%,19%)',
              actionHover: 'hsl(0,0%,13%)',
              inverse: '#95a0a7',
              shaft: '#555',
          }),
    success: '#05825D',
    info: '#0452b7',
    danger: 'hsl(356, 53%, 36%)',
    warning: 'hsl(59,31%,28%)',
    black: '#000',
    green: '#a4d037',
    yellow: '#fecd35',
    red: '#f05230',
    ghost_accent: '#3da2fa',
    interesting_greenish_blue: '#2c3e50',
})
