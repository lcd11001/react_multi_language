import { createMuiTheme } from '@material-ui/core/styles';
import { breakpointsStyle } from '../Styles'

const pxToRem = (size) => `${size / 16}rem`

const defaultMuiTheme = createMuiTheme();

const defaultTheme = createMuiTheme({
    palette: {
        background: {
            default: '#FFFFFF'
        },
        primary: {
            main: '#4E5496',
            secondary: '#F26A65'
        },
        text: {
            primary: '#231F20',
            secondary: '#F26A65',
            disabled: '#C3C3C3'
        },
        error: {
            main: '#FF4444'
        },

        warning: {
            main: '#F9C257'
        }
    },
    mixins: {
        toolbar: {
            minHeight: 48,
            '@media (min-width:0px) and (orientation:landscape)': {
                minHeight: 40,
            },
            '@media (min-width:600px)': {
                minHeight: 56,
            }
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                ul: {
                    marginBlockStart: 0,
                    marginBlockEnd: 0
                }
            }
        },
        MuiToolbar: {
            regular: {
                backgroundColor: '#282F48'
            }
        },
        MuiButton: {
            root: {
                minWidth: 135,
                borderRadius: 7,
                ...breakpointsStyle(defaultMuiTheme,
                    {
                        key: ['height', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
                        value: [55, 20, 20, 30, 30],
                        variant: [5, 2, 2, 4, 4],
                        variantSM: [0, 0, 0, 0, 0],
                        unit: ['px', 'px', 'px', 'px', 'px']
                    }
                ),
            },
            containedPrimary: {
                backgroundColor: '#4E5496',
                color: '#FFFFFF',
                boxShadow: 'none !important',
                '&:hover': {
                    backgroundColor: '#464b87',
                    color: '#FFFFFF'
                },
                '&:active': {
                    backgroundColor: '#3e4378',
                    color: '#FFFFFF',
                },
                '&.Mui-disabled': {
                    backgroundColor: '#0f101e',
                    color: '#ABABAB',
                }
            },
            containedSecondary: {
                backgroundColor: '#f26a65',
                color: '#FFFFFF',
                boxShadow: 'none !important',
                '&:hover': {
                    backgroundColor: '#d95f5a',
                    color: '#FFFFFF',
                },
                '&:active': {
                    backgroundColor: '#c15450',
                    color: '#FFFFFF',
                },
                '&.Mui-disabled': {
                    backgroundColor: '#301514',
                    color: '#ABABAB',
                }
            },
            label: {
                fontWeight: 'normal',
                fontFamily: '"Raleway", sans-serif !important',
                textTransform: 'initial',
                ...breakpointsStyle(defaultMuiTheme,
                    {
                        key: ['font-size'],
                        value: [18],
                        variant: [1],
                        variantSM: [-1],
                        unit: ['px']
                    }
                ),
            }
        },
        MuiOutlinedInput: {
            root: {
                backgroundColor: 'white',
                borderRadius: 7,
                '& fieldset': {
                    borderColor: '#D6D6D6',
                },
                '&:hover fieldset': {
                    borderColor: '#4A58B2 !important',
                }
            },
            input: {
                color: '#525252',
                height: 40,
                padding: '0 10px',
                // Fixed: override Chrome autofill background color
                '&:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px white inset !important',
                    backgroundColor: 'white !important'
                }
            },
        },
        MuiFormLabel: {
            root: {
                fontFamily: '"Raleway", sans-serif !important',
                color: '#ABABAB',
                '&.Mui-focused': {
                    color: '#4E5496'
                },
                '&.Mui-disabled': {
                    color: '#1B1F43'
                }
            }
        },
        MuiInputLabel: {
            outlined: {
                transform: 'translate(14px, 14px) scale(1)'
            }
        },
        MuiTableSortLabel: {
            root: {
                color: 'inherit',
                // onMouse hover
                '&:hover': {
                    color: 'inherit',
                    fontWeight: 600,
                },
                // onMouse click
                '&:active': {
                    color: 'inherit',
                },
            },
            // after sorted
            active: {
                color: 'inherit !important',
                fontWeight: 600,
                fontStyle: 'italic'
            },
            // icon
            iconDirectionAsc: {
                color: 'red !important'
            },
            iconDirectionDesc: {
                color: 'green !important'
            }
        },
        MuiTypography: {
            root: {
                userSelect: 'none',
                fontFamily: '"Raleway", sans-serif !important',
                '-webkit-font-smoothing': 'antialiased',
            },
            caption: {
                color: '#525252'
            },
            colorInherit: {
                fontWeight: "inherit",
                fontSize: 'inherit'
            }
        },
        MuiListItemIcon: {
            root: {
                minWidth: 32,
                color: '#525252'
            },
        },
        MuiListItemText: {
            primary: {
                color: '#525252'
            }
        },
        MuiTouchRipple: {
            rippleVisible: {
                color: 'rgba(0, 0, 0, 0.2)'
            },
        },
        MuiListItem: {
            root: {
                '&.Mui-selected': {
                    backgroundColor: '#E1E5F280',
                    '&:hover': {
                        backgroundColor: '#F2F2F2',
                    },
                    '&:active': {
                        backgroundColor: '#E1E5F2FF'
                    }
                }
            },
            button: {
                backgroundColor: 'white',
                '&:hover': {
                    backgroundColor: '#F2F2F2'
                }
            }
        },
        MuiCheckbox: {
            colorPrimary: {
                color: '#F26A65',
                '&:hover': {
                    color: '#4E5496'
                },
                '&.Mui-checked': {
                    color: '#4E5496'
                }
            },
            colorSecondary: {
                color: '#4E5496',
                '&:hover': {
                    color: '#F26A65'
                },
                '&.Mui-checked': {
                    color: '#F26A65'
                }
            }
        },
        MuiFormControlLabel: {
            label: {
                color: '#525252'
            }
        },
        MuiSnackbarContent: {
            message: {
                padding: 0,
                minHeight: 32,
                display: 'flex'
            }
        },
        MuiInputBase: {
            input: {
                '&.Mui-disabled': {
                    backgroundColor: '#F5F4EF',
                    color: '#525252'
                }
            }
        },
        MuiFormHelperText: {
            root: {
                color: '#282F48'
            },
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: '#FFFF',
                color: '#1B1F43',
                boxShadow: defaultMuiTheme.shadows[1],
                fontSize: 11
            }
        },
        MuiPickersDay: {
            day: {
                fontWeight: 400
            },
            current: {
                backgroundColor: 'rgba(255, 255, 0, 0.3)'
            }
        }
    }
});

export default defaultTheme