import { treeItemClasses } from '@mui/x-tree-view';
import { createTheme, keyframes, type Theme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import type {} from '@mui/x-tree-view-pro/themeAugmentation';

import { DEFAULT_DENSE_THEME_FEATURES } from './presets';
import type { DenseColorMode, DenseThemeConfig, DenseThemeFeatures } from './types';

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

const COMPACT_BUTTON_VERTICAL_BIAS_PX = 1;
const COMPACT_CHIP_LABEL_OFFSET_PX = 1.5;

type CompactInputLabelOwnerState = {
    formControl?: unknown;
    size?: 'small' | 'medium';
    shrink?: boolean;
    variant?: 'standard' | 'filled' | 'outlined';
};

type CreateDenseThemeOptions = {
    animationsDisabled: boolean;
    colorMode: DenseColorMode;
    config: DenseThemeConfig;
    features?: DenseThemeFeatures;
};

function getOpticallyBiasedButtonPadding(top: number, horizontal: number, bottom: number) {
    return `${top + COMPACT_BUTTON_VERTICAL_BIAS_PX}px ${horizontal}px ${bottom - COMPACT_BUTTON_VERTICAL_BIAS_PX}px`;
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

function createBaseDenseTheme(
    config: DenseThemeConfig,
    colorMode: DenseColorMode,
    animationsDisabled: boolean,
) {
    return createTheme({
        palette: {
            mode: colorMode,
        },
        spacing: config.spacingBase,
        typography: {
            fontSize: Math.round(14 * config.typographyScale),
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
                    disableGutters: config.disableGlobalGutters,
                },
            },
            MuiAutocomplete: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: animationsDisabled,
                },
            },
            MuiButton: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiButtonGroup: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiChip: {
                defaultProps: {
                    size: config.componentSize,
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
                    disableGutters: config.disableGlobalGutters,
                },
            },
            MuiFab: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiFilledInput: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiFormControl: {
                defaultProps: config.denseFormMargins ? { margin: 'dense' } : {},
            },
            MuiIconButton: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiList: {
                defaultProps: {
                    dense: config.denseLists,
                    disablePadding: config.listDisablePadding,
                },
            },
            MuiListItem: {
                defaultProps: {
                    dense: config.denseLists,
                    disableGutters: config.disableGlobalGutters,
                    disablePadding: config.listDisablePadding,
                },
            },
            MuiListItemButton: {
                defaultProps: {
                    dense: config.denseLists,
                },
            },
            MuiListSubheader: {
                defaultProps: {
                    disableGutters: config.disableGlobalGutters,
                },
            },
            MuiMenuItem: {
                defaultProps: {
                    dense: config.denseLists,
                },
            },
            MuiMenuList: {
                defaultProps: {
                    dense: config.denseLists,
                },
            },
            MuiOutlinedInput: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiPagination: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiPaginationItem: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiRadio: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiSelect: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiSlider: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiSwitch: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiTable: {
                defaultProps: {
                    size: config.tableSize,
                },
            },
            MuiTableCell: {
                defaultProps: {
                    size: config.tableSize,
                },
            },
            MuiTextField: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiToggleButton: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiToggleButtonGroup: {
                defaultProps: {
                    size: config.componentSize,
                },
            },
            MuiToolbar: {
                defaultProps: {
                    disableGutters: config.toolbarDisableGutters,
                    variant: config.toolbarDense ? 'dense' : 'regular',
                },
            },
        },
    });
}

function createDenseFeatureThemeOptions(features: DenseThemeFeatures) {
    return {
        components: {
            ...(features.compactButtonsAndChips
                ? {
                      MuiButton: {
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
                                  transform: `translateY(${COMPACT_CHIP_LABEL_OFFSET_PX}px)`,
                              },
                              labelSmall: {
                                  alignItems: 'center',
                                  display: 'flex',
                                  height: '100%',
                                  paddingLeft: 6,
                                  paddingRight: 6,
                                  transform: `translateY(${COMPACT_CHIP_LABEL_OFFSET_PX}px)`,
                              },
                          },
                      },
                  }
                : {}),
            ...(features.compactIconButtons
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
            ...(features.compactInputs
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
            ...(features.compactListsAndMenus
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
            ...(features.compactAccordionSummary
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
            ...(features.compactTableCells
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
            ...(features.compactTreeItems
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

export function getPreferredColorMode(): DenseColorMode {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function createDenseTheme({
    animationsDisabled,
    colorMode,
    config,
    features = DEFAULT_DENSE_THEME_FEATURES,
}: CreateDenseThemeOptions) {
    const baseTheme = createBaseDenseTheme(config, colorMode, animationsDisabled);

    return createTheme(baseTheme, createDenseFeatureThemeOptions(features));
}
