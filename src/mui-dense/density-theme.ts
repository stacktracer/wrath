import { gridClasses } from '@mui/x-data-grid-pro';
import { treeItemClasses } from '@mui/x-tree-view';
import { createTheme, keyframes, type Theme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import type {} from '@mui/x-tree-view-pro/themeAugmentation';

import type { AdvancedDensityControls, DensityControls, GalleryColorMode } from './density-controls';

const circularRotateKeyframe = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

const circularDashKeyframe = keyframes`
    0% {
        stroke-dasharray: 1px, 200px;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 100px, 200px;
        stroke-dashoffset: -15px;
    }

    100% {
        stroke-dasharray: 1px, 200px;
        stroke-dashoffset: -126px;
    }
`;

type CompactInputLabelOwnerState = {
    formControl?: unknown;
    size?: 'small' | 'medium';
    shrink?: boolean;
    variant?: 'standard' | 'filled' | 'outlined';
};

function getCompactInputLabelStyles(ownerState: CompactInputLabelOwnerState) {
    const size = ownerState.size === 'small' ? 'small' : 'medium';

    if (ownerState.variant === 'outlined') {
        return ownerState.shrink
            ? {
                  transform: `translate(14px, ${size === 'small' ? '-7px' : '-9px'}) scale(0.75)`,
              }
            : {
                  transform: `translate(14px, ${size === 'small' ? '8px' : '14px'}) scale(1)`,
              };
    }

    if (ownerState.variant === 'filled') {
        return ownerState.shrink
            ? {
                  transform: `translate(12px, ${size === 'small' ? '2px' : '6px'}) scale(0.75)`,
              }
            : {
                  transform: `translate(12px, ${size === 'small' ? '11px' : '14px'}) scale(1)`,
              };
    }

    if (ownerState.formControl) {
        return ownerState.shrink
            ? {
                  transform: 'translate(0, -2px) scale(0.75)',
              }
            : {
                  transform: `translate(0, ${size === 'small' ? '15px' : '18px'}) scale(1)`,
              };
    }

    return {};
}

function createCompactTreeSelectors(theme: Theme) {
    const compactVerticalInset = theme.spacing(0.25);
    const compactHorizontalInset = theme.spacing(0.75);
    const compactGap = theme.spacing(0.5);

    return {
        [`& .${treeItemClasses.content}`]: {
            gap: compactGap,
            paddingTop: compactVerticalInset,
            paddingRight: compactHorizontalInset,
            paddingBottom: compactVerticalInset,
            paddingLeft: `calc(${compactHorizontalInset} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
        },
        [`& .${treeItemClasses.content}[data-expanded], & .${treeItemClasses.content}[data-selected], & .${treeItemClasses.content}[data-focused], & .${treeItemClasses.content}[data-disabled], & .${treeItemClasses.content}[data-editable], & .${treeItemClasses.content}[data-editing]`]:
            {
                gap: compactGap,
                paddingTop: compactVerticalInset,
                paddingBottom: compactVerticalInset,
            },
        [`& .${treeItemClasses.groupTransition}`]: {
            margin: 0,
        },
        [`& .${treeItemClasses.iconContainer}`]: {
            minWidth: 14,
            width: 14,
            '& svg': {
                fontSize: 16,
            },
        },
        [`& .${treeItemClasses.label}`]: {
            lineHeight: 1.2,
        },
    };
}

export function getPreferredColorMode(): GalleryColorMode {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function createDensityTheme(
    controls: DensityControls,
    colorMode: GalleryColorMode,
    animationsDisabled: boolean,
) {
    return createTheme({
        palette: {
            mode: colorMode,
        },
        spacing: controls.spacingBase,
        typography: {
            fontSize: Math.round(14 * controls.typographyScale),
        },
        transitions: animationsDisabled
            ? {
                  create: () => 'none',
                  duration: {
                      complex: 0,
                      enteringScreen: 0,
                      leavingScreen: 0,
                      short: 0,
                      shorter: 0,
                      shortest: 0,
                      standard: 0,
                  },
                  easing: {
                      easeIn: 'linear',
                      easeInOut: 'linear',
                      easeOut: 'linear',
                      sharp: 'linear',
                  },
                  getAutoHeightDuration: () => 0,
              }
            : undefined,
        components: {
            MuiAccordion: {
                defaultProps: {
                    disableGutters: controls.disableGlobalGutters,
                },
            },
            MuiAutocomplete: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: animationsDisabled,
                },
            },
            MuiButton: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiButtonGroup: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiChip: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            ...(animationsDisabled
                ? {
                      MuiCircularProgress: {
                          styleOverrides: {
                              indeterminate: {
                                  animation: `${circularRotateKeyframe} 1.4s linear infinite !important`,
                              },
                              circleIndeterminate: {
                                  animation: `${circularDashKeyframe} 1.4s ease-in-out infinite !important`,
                              },
                          },
                      },
                  }
                : {}),
            ...(animationsDisabled
                ? {
                      MuiCssBaseline: {
                          styleOverrides: {
                              '*, *::before, *::after': {
                                  animation: 'none !important',
                                  scrollBehavior: 'auto !important',
                                  transition: 'none !important',
                              },
                          },
                      },
                  }
                : {}),
            MuiContainer: {
                defaultProps: {
                    disableGutters: controls.disableGlobalGutters,
                },
            },
            MuiFab: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiFilledInput: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiFormControl: {
                defaultProps: controls.denseFormMargins ? { margin: 'dense' } : {},
            },
            MuiIconButton: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiList: {
                defaultProps: {
                    dense: controls.denseLists,
                    disablePadding: controls.listDisablePadding,
                },
            },
            MuiListItem: {
                defaultProps: {
                    dense: controls.denseLists,
                    disableGutters: controls.disableGlobalGutters,
                    disablePadding: controls.listDisablePadding,
                },
            },
            MuiListItemButton: {
                defaultProps: {
                    dense: controls.denseLists,
                },
            },
            MuiListSubheader: {
                defaultProps: {
                    disableGutters: controls.disableGlobalGutters,
                },
            },
            MuiMenuItem: {
                defaultProps: {
                    dense: controls.denseLists,
                },
            },
            MuiMenuList: {
                defaultProps: {
                    dense: controls.denseLists,
                },
            },
            MuiOutlinedInput: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiPagination: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiPaginationItem: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiRadio: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiSelect: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiSlider: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiSwitch: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiTable: {
                defaultProps: {
                    size: controls.tableSize,
                },
            },
            MuiTableCell: {
                defaultProps: {
                    size: controls.tableSize,
                },
            },
            MuiTextField: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiToggleButton: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiToggleButtonGroup: {
                defaultProps: {
                    size: controls.componentSize,
                },
            },
            MuiToolbar: {
                defaultProps: {
                    disableGutters: controls.toolbarDisableGutters,
                    variant: controls.toolbarDense ? 'dense' : 'regular',
                },
            },
        },
    });
}

export function createAdvancedDensityThemeOptions(controls: AdvancedDensityControls) {
    return {
        components: {
            ...(controls.compactButtonsAndChips
                ? {
                      MuiButton: {
                          styleOverrides: {
                              root: {
                                  lineHeight: 1.2,
                              },
                              containedSizeMedium: {
                                  minHeight: 30,
                                  padding: '6px 12px 4px',
                              },
                              containedSizeSmall: {
                                  minHeight: 26,
                                  padding: '3px 8px 1px',
                              },
                              outlinedSizeMedium: {
                                  minHeight: 30,
                                  padding: '5px 12px 3px',
                              },
                              outlinedSizeSmall: {
                                  minHeight: 26,
                                  padding: '3px 7px 1px',
                              },
                              textSizeMedium: {
                                  minHeight: 30,
                                  padding: '6px 6px 4px',
                              },
                              textSizeSmall: {
                                  minHeight: 26,
                                  padding: '3px 4px 1px',
                              },
                          },
                      },
                      MuiChip: {
                          styleOverrides: {
                              root: {
                                  lineHeight: 1.15,
                              },
                              sizeMedium: {
                                  height: 28,
                              },
                              sizeSmall: {
                                  height: 22,
                              },
                              label: {
                                  alignItems: 'center',
                                  display: 'flex',
                                  height: '100%',
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  transform: 'translateY(0.5px)',
                              },
                              labelSmall: {
                                  alignItems: 'center',
                                  display: 'flex',
                                  height: '100%',
                                  paddingLeft: 6,
                                  paddingRight: 6,
                                  transform: 'translateY(0.5px)',
                              },
                          },
                      },
                  }
                : {}),
            ...(controls.compactIconButtons
                ? {
                      MuiIconButton: {
                          styleOverrides: {
                              sizeMedium: {
                                  padding: 6,
                              },
                              sizeSmall: {
                                  padding: 4,
                              },
                          },
                      },
                  }
                : {}),
            ...(controls.compactInputs
                ? {
                      MuiFilledInput: {
                          styleOverrides: {
                              input: {
                                  paddingTop: 20,
                                  paddingRight: 10,
                                  paddingBottom: 7,
                                  paddingLeft: 10,
                              },
                              inputSizeSmall: {
                                  paddingTop: 17,
                                  paddingRight: 10,
                                  paddingBottom: 3,
                                  paddingLeft: 10,
                              },
                          },
                      },
                      MuiFormHelperText: {
                          styleOverrides: {
                              root: {
                                  marginTop: 2,
                              },
                          },
                      },
                      MuiInput: {
                          styleOverrides: {
                              input: {
                                  paddingTop: 2,
                                  paddingBottom: 3,
                              },
                              inputSizeSmall: {
                                  paddingTop: 0,
                                  paddingBottom: 2,
                              },
                          },
                      },
                      MuiInputBase: {
                          styleOverrides: {
                              input: {
                                  paddingTop: 3,
                                  paddingBottom: 3,
                              },
                              inputSizeSmall: {
                                  paddingTop: 0,
                                  paddingBottom: 2,
                              },
                          },
                      },
                      MuiInputLabel: {
                          styleOverrides: {
                              root: ({ ownerState }: { ownerState: CompactInputLabelOwnerState }) =>
                                  getCompactInputLabelStyles(ownerState),
                          },
                      },
                      MuiOutlinedInput: {
                          styleOverrides: {
                              input: {
                                  padding: '14px 12px',
                              },
                              inputSizeSmall: {
                                  padding: '7px 12px',
                              },
                          },
                      },
                  }
                : {}),
            ...(controls.compactListsAndMenus
                ? {
                      MuiListItemButton: {
                          styleOverrides: {
                              root: {
                                  minHeight: 34,
                                  paddingBlock: 4,
                              },
                          },
                      },
                      MuiListSubheader: {
                          styleOverrides: {
                              root: {
                                  lineHeight: '2rem',
                                  paddingInline: 12,
                              },
                          },
                      },
                      MuiMenuItem: {
                          styleOverrides: {
                              root: {
                                  minHeight: 34,
                                  paddingBlock: 4,
                              },
                          },
                      },
                  }
                : {}),
            ...(controls.compactAccordionSummary
                ? {
                      MuiAccordionSummary: {
                          styleOverrides: {
                              content: {
                                  '&.Mui-expanded': {
                                      marginBlock: 8,
                                  },
                                  marginBlock: 8,
                              },
                              root: {
                                  '&.Mui-expanded': {
                                      minHeight: 44,
                                  },
                                  minHeight: 44,
                              },
                          },
                      },
                  }
                : {}),
            ...(controls.compactTableCells
                ? {
                      MuiTableCell: {
                          styleOverrides: {
                              root: {
                                  paddingBlock: 6,
                                  paddingInline: 10,
                              },
                          },
                      },
                  }
                : {}),
            ...(controls.compactDataGridCells
                ? {
                      MuiDataGrid: {
                          styleOverrides: {
                              root: {
                                  [`& .${gridClasses.cell}`]: {
                                      paddingInline: 10,
                                  },
                                  [`& .${gridClasses.columnHeader}`]: {
                                      paddingInline: 10,
                                  },
                              },
                          },
                      },
                  }
                : {}),
            ...(controls.compactTreeItems
                ? {
                      MuiRichTreeView: {
                          styleOverrides: {
                              root: ({ theme }: { theme: Theme }) => createCompactTreeSelectors(theme),
                          },
                      },
                      MuiRichTreeViewPro: {
                          styleOverrides: {
                              root: ({ theme }: { theme: Theme }) => createCompactTreeSelectors(theme),
                          },
                      },
                      MuiSimpleTreeView: {
                          styleOverrides: {
                              root: ({ theme }: { theme: Theme }) => createCompactTreeSelectors(theme),
                          },
                      },
                  }
                : {}),
        },
    };
}
