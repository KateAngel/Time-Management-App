import { PaletteMode } from '@mui/material'
import { Colors } from './palette'
import { MODES } from './modes'

declare module '@mui/material/styles' {
    interface Palette {
        inputBG: Palette['primary']
    }
    interface PaletteOptions {
        inputBG: PaletteOptions['primary']
    }
}

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        common: {
            black: '#000',
            white: '#fff',
        },
        error: {
            main: Colors(mode).danger,
        },
        warning: {
            main: Colors(mode).warning,
        },
        divider: Colors(mode).divider,
        action: {
            hover: Colors(mode).actionHover,
        },
        ...(mode === MODES.LIGHT
            ? {
                  // palette values for light mode
                  inputBG: {
                      main: Colors(mode).inputBG,
                      dark: Colors(mode).muted,
                  },
                  background: {
                      default: Colors(mode).body_bg,
                      paper: Colors(mode).bg_paper,
                  },
                  primary: {
                      main: Colors(mode).primaryMain,
                      light: Colors(mode).primaryLight,
                      dark: Colors(mode).primaryDark,
                      contrastText: Colors(mode).primary_contrastText,
                  },
                  secondary: {
                      main: Colors(mode).secondaryMain,
                      light: Colors(mode).secondaryLight,
                      dark: Colors(mode).secondaryDark,
                      contrastText: Colors(mode).secondary_contrastText,
                  },
                  text: {
                      primary: Colors(mode).textPrimary, //blueGrey[900], // grey[900]
                      secondary: Colors(mode).textSecondary, //blueGrey[600], // grey[800]
                      disabled: '',
                      icon: '',
                  },
              }
            : {
                  // mode === MODES.DARK
                  // palette values for dark mode
                  inputBG: {
                      main: Colors(mode).inputBG,
                      dark: Colors(mode).muted,
                  },
                  background: {
                      default: Colors(mode).body_bg,
                      paper: Colors(mode).bg_paper,
                  },
                  primary: {
                      main: Colors(mode).primaryMain,
                      light: Colors(mode).primaryLight,
                      dark: Colors(mode).primaryDark,
                      contrastText: Colors(mode).primary_contrastText,
                  },
                  secondary: {
                      main: Colors(mode).secondaryMain,
                      light: Colors(mode).secondaryLight,
                      dark: Colors(mode).secondaryDark,
                      contrastText: Colors(mode).primary_contrastText,
                  },
                  text: {
                      primary: Colors(mode).textPrimary,
                      secondary: Colors(mode).textSecondary,
                  },
              }),
    },
})

export const getThemedComponents = (mode: PaletteMode) => {
    const designTokens = getDesignTokens(mode)

    return {
        components: {
            MuiAppBar: {
                styleOverrides: {
                    colorPrimary: {
                        backgroundColor:
                            designTokens.palette.background.default,
                    },
                },
            },
            MuiLoadingButton: {
                styleOverrides: {
                    root: {},
                },
            },
            MuiBox: {
                styleOverrides: {
                    box: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    },
                },
            },
            ...(mode === MODES.LIGHT
                ? {}
                : {
                      // components values for dark mode
                      MuiLink: {
                          variant: 'h6',
                      },
                      MuiButton: {
                          styleOverrides: {
                              root: {
                                  // color: common.white,
                                  fontFamily:
                                      "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                                  // fontSize: 40,
                                  // borderWidth: 2,
                                  '&:hover': {
                                      borderWidth: 2,
                                  },
                              },
                          },
                          variants: [
                              {
                                  props: { variant: 'contained' },
                                  style: {},
                              },
                              {
                                  props: { variant: 'outlined' },
                                  style: {},
                              },
                              {
                                  props: {
                                      variant: 'primary',
                                      color: 'primary',
                                  },
                                  style: {
                                      border: '4px dashed blue',
                                  },
                              },
                          ],
                      },
                      MuiList: {
                          styleOverrides: {
                              root: {},
                          },
                      },

                      MuiMenuItem: {
                          styleOverrides: {
                              root: {
                                  alignItems: 'stretch',
                                  fontFamily:
                                      "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                              },
                          },
                      },
                      MuiAccordion: {
                          styleOverrides: {
                              root: {},
                          },
                      },
                  }),
        },
    }
}
