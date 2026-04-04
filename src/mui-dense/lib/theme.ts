import { treeItemClasses } from '@mui/x-tree-view';
import { createTheme, keyframes, type Theme, type ThemeOptions } from '@mui/material/styles';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import type {} from '@mui/x-tree-view-pro/themeAugmentation';

import type { DenseSettings } from './settings';

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

function getOpticallyBiasedButtonPadding(top: number, horizontal: number, bottom: number) {
    return `${top + 1}px ${horizontal}px ${bottom - 1}px`;
}

function getCompactInputLabelStyles(ownerState: CompactInputLabelOwnerState) {
    const size = ownerState.size === 'small' ? 'small' : 'medium';

    if (ownerState.variant === 'outlined') {
        return ownerState.shrink
            ? {
                  transform: `translate(14px, ${size === 'small' ? '-9px' : '-11px'}) scale(0.75)`,
              }
            : {
                  transform: `translate(14px, ${size === 'small' ? '6px' : '12px'}) scale(1)`,
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

export function createDenseTheme(dense: DenseSettings, palette?: ThemeOptions['palette']) {
    return createTheme({
        ...(palette === undefined ? {} : { palette }),
        spacing: dense.spacingBase,
        typography: {
            fontSize: Math.round(14 * dense.typographyScale),
        },
        transitions: dense.disableAnimations
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
                    disableGutters: dense.disableGlobalGutters,
                },
            },
            ...(dense.compactAccordionSummary
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
            MuiAutocomplete: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            MuiButton: {
                defaultProps: {
                    size: dense.componentSize,
                },
                ...(dense.compactButtonsAndChips
                    ? {
                          styleOverrides: {
                              root: {
                                  lineHeight: 1.2,
                              },
                              containedSizeMedium: {
                                  minHeight: 30,
                                  padding: getOpticallyBiasedButtonPadding(6, 12, 4),
                              },
                              containedSizeSmall: {
                                  minHeight: 26,
                                  padding: getOpticallyBiasedButtonPadding(3, 8, 1),
                              },
                              outlinedSizeMedium: {
                                  minHeight: 30,
                                  padding: getOpticallyBiasedButtonPadding(5, 12, 3),
                              },
                              outlinedSizeSmall: {
                                  minHeight: 26,
                                  padding: getOpticallyBiasedButtonPadding(3, 7, 1),
                              },
                              textSizeMedium: {
                                  minHeight: 30,
                                  padding: getOpticallyBiasedButtonPadding(6, 6, 4),
                              },
                              textSizeSmall: {
                                  minHeight: 26,
                                  padding: getOpticallyBiasedButtonPadding(3, 4, 1),
                              },
                          },
                      }
                    : {}),
            },
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: dense.disableAnimations,
                },
            },
            MuiButtonGroup: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            MuiChip: {
                defaultProps: {
                    size: dense.componentSize,
                },
                ...(dense.compactButtonsAndChips
                    ? {
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
                                  transform: 'translateY(1.5px)',
                              },
                              labelSmall: {
                                  alignItems: 'center',
                                  display: 'flex',
                                  height: '100%',
                                  paddingLeft: 6,
                                  paddingRight: 6,
                                  transform: 'translateY(1.5px)',
                              },
                          },
                      }
                    : {}),
            },
            ...(dense.disableAnimations
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
            ...(dense.disableAnimations
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
                    disableGutters: dense.disableGlobalGutters,
                },
            },
            MuiFab: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            MuiFilledInput: {
                defaultProps: {
                    size: dense.componentSize,
                },
                ...(dense.compactInputs
                    ? {
                          styleOverrides: {
                              input: {
                                  paddingTop: 20,
                                  paddingRight: 10,
                                  paddingBottom: 7,
                                  paddingLeft: 10,
                                  '&.MuiInputBase-inputSizeSmall': {
                                      paddingTop: 17,
                                      paddingRight: 10,
                                      paddingBottom: 3,
                                      paddingLeft: 10,
                                  },
                              },
                          },
                      }
                    : {}),
            },
            MuiFormControl: {
                defaultProps: dense.denseFormMargins ? { margin: 'dense' } : {},
            },
            ...(dense.compactInputs
                ? {
                      MuiFormHelperText: {
                          styleOverrides: {
                              root: {
                                  marginTop: 2,
                              },
                          },
                      },
                  }
                : {}),
            MuiIconButton: {
                defaultProps: {
                    size: dense.componentSize,
                },
                ...(dense.compactIconButtons
                    ? {
                          styleOverrides: {
                              sizeMedium: {
                                  padding: 6,
                              },
                              sizeSmall: {
                                  padding: 4,
                              },
                          },
                      }
                    : {}),
            },
            ...(dense.compactInputs
                ? {
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
                  }
                : {}),
            MuiList: {
                defaultProps: {
                    dense: dense.denseLists,
                    disablePadding: dense.listDisablePadding,
                },
            },
            MuiListItem: {
                defaultProps: {
                    dense: dense.denseLists,
                    disableGutters: dense.disableGlobalGutters,
                    disablePadding: dense.listDisablePadding,
                },
            },
            MuiListItemButton: {
                defaultProps: {
                    dense: dense.denseLists,
                },
                ...(dense.compactListsAndMenus
                    ? {
                          styleOverrides: {
                              root: {
                                  minHeight: 34,
                                  paddingBlock: 4,
                              },
                          },
                      }
                    : {}),
            },
            MuiListSubheader: {
                defaultProps: {
                    disableGutters: dense.disableGlobalGutters,
                },
                ...(dense.compactListsAndMenus
                    ? {
                          styleOverrides: {
                              root: {
                                  lineHeight: '2rem',
                                  paddingInline: 12,
                              },
                          },
                      }
                    : {}),
            },
            MuiMenuItem: {
                defaultProps: {
                    dense: dense.denseLists,
                },
                ...(dense.compactListsAndMenus
                    ? {
                          styleOverrides: {
                              root: {
                                  minHeight: 34,
                                  paddingBlock: 4,
                              },
                          },
                      }
                    : {}),
            },
            MuiMenuList: {
                defaultProps: {
                    dense: dense.denseLists,
                },
            },
            MuiOutlinedInput: {
                defaultProps: {
                    size: dense.componentSize,
                },
                ...(dense.compactInputs
                    ? {
                          styleOverrides: {
                              input: {
                                  padding: '14px 12px',
                              },
                              inputSizeSmall: {
                                  padding: '7px 12px',
                              },
                          },
                      }
                    : {}),
            },
            MuiPagination: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            MuiPaginationItem: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            MuiRadio: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            ...(dense.compactTreeItems
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
                  }
                : {}),
            MuiSelect: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            ...(dense.compactTreeItems
                ? {
                      MuiSimpleTreeView: {
                          styleOverrides: {
                              root: ({ theme }: { theme: Theme }) => createCompactTreeSelectors(theme),
                          },
                      },
                  }
                : {}),
            MuiSlider: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            MuiSwitch: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            MuiTable: {
                defaultProps: {
                    size: dense.tableSize,
                },
            },
            MuiTableCell: {
                defaultProps: {
                    size: dense.tableSize,
                },
                ...(dense.compactTableCells
                    ? {
                          styleOverrides: {
                              root: {
                                  paddingBlock: 6,
                                  paddingInline: 10,
                              },
                          },
                      }
                    : {}),
            },
            MuiTextField: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            MuiToggleButton: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            MuiToggleButtonGroup: {
                defaultProps: {
                    size: dense.componentSize,
                },
            },
            MuiToolbar: {
                defaultProps: {
                    disableGutters: dense.toolbarDisableGutters,
                    variant: dense.toolbarDense ? 'dense' : 'regular',
                },
            },
        },
    });
}
