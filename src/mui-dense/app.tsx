import {
    type MouseEvent,
    type ReactNode,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Alert,
    AlertTitle,
    AppBar,
    Autocomplete,
    Avatar,
    AvatarGroup,
    Backdrop,
    Badge,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Breadcrumbs,
    Button,
    ButtonBase,
    ButtonGroup,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Checkbox,
    Chip,
    CircularProgress,
    ClickAwayListener,
    Collapse,
    Container,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Drawer,
    Fab,
    Fade,
    FilledInput,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Grid,
    GridLegacy,
    Grow,
    Icon,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Input,
    InputAdornment,
    InputBase,
    InputLabel,
    LinearProgress,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    Menu,
    MenuItem,
    MenuList,
    MobileStepper,
    Modal,
    NativeSelect,
    NoSsr,
    OutlinedInput,
    Pagination,
    PaginationItem,
    Paper,
    Popover,
    Popper,
    Portal,
    Radio,
    RadioGroup,
    Rating,
    ScopedCssBaseline,
    Select,
    Skeleton,
    Slide,
    Slider,
    Snackbar,
    SnackbarContent,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Stack,
    Step,
    StepButton,
    StepConnector,
    StepContent,
    StepIcon,
    StepLabel,
    Stepper,
    SvgIcon,
    SwipeableDrawer,
    Switch,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TablePaginationActions,
    TableRow,
    TableSortLabel,
    Tabs,
    TextField,
    TextareaAutosize,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
    Tooltip,
    Typography,
    Unstable_TrapFocus,
    Zoom,
} from '@mui/material';
import { ThemeProvider, createTheme, keyframes, type Theme } from '@mui/material/styles';
import {
    DataGridPro,
    gridClasses,
    type GridColumnHeaderParams,
    type DataGridProProps,
    type GridColDef,
    type GridRenderCellParams,
} from '@mui/x-data-grid-pro';
import { RichTreeView, SimpleTreeView, TreeItem, treeItemClasses } from '@mui/x-tree-view';
import { RichTreeViewPro, useRichTreeViewProApiRef } from '@mui/x-tree-view-pro';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import type {} from '@mui/x-tree-view-pro/themeAugmentation';

import { muiXLicenseConfigured } from './license';

type RouteOption = {
    label: string;
    region: string;
    density: string;
};

type ShipmentRow = {
    id: number;
    lane: string;
    stage: string;
    eta: string;
    owner: string;
    risk: 'Low' | 'Medium' | 'High';
};

type TreeDemoItem = {
    id: string;
    label: string;
    children?: TreeDemoItem[];
};

type AdvancedDensityControls = {
    compactButtonsAndChips: boolean;
    compactIconButtons: boolean;
    compactInputs: boolean;
    compactListsAndMenus: boolean;
    compactAccordionSummary: boolean;
    compactTableCells: boolean;
    compactDataGridCells: boolean;
    compactDataGridToolbar: boolean;
    compactTreeItems: boolean;
};

type AdvancedControlDefinition = {
    key: keyof AdvancedDensityControls;
    label: string;
    mechanism: string;
    description: string;
};

type DensityPreset = 'default' | 'dense' | 'densePlus';
type DensityPresetSelection = DensityPreset | 'custom';

type DensityControls = {
    spacingBase: number;
    layoutScale: number;
    typographyScale: number;
    componentSize: 'small' | 'medium';
    denseFormMargins: boolean;
    disableGlobalGutters: boolean;
    denseLists: boolean;
    listDisablePadding: boolean;
    toolbarDense: boolean;
    toolbarDisableGutters: boolean;
    tableSize: 'small' | 'medium';
    imageGap: number;
    dataGridDensity: 'comfortable' | 'standard' | 'compact';
    dataGridHeaderFilters: boolean;
    dataGridHeaderFilterHeight: number;
    treeIndentation: number;
};

type GalleryColorMode = 'light' | 'dark';

type AutoDataGridMetrics = {
    checkboxHeight: number;
    columnHeaderHeight: number;
    devicePixelRatio: number;
    rowHeight: number;
    textLineHeight: number;
    xHeight: number;
};

const DENSITY_PRESET_LABELS: Record<DensityPresetSelection, string> = {
    default: 'Default',
    dense: 'Dense',
    densePlus: 'Dense+',
    custom: 'Custom',
};

const DEFAULT_ADVANCED_DENSITY_CONTROLS: AdvancedDensityControls = {
    compactButtonsAndChips: false,
    compactIconButtons: false,
    compactInputs: false,
    compactListsAndMenus: false,
    compactAccordionSummary: false,
    compactTableCells: false,
    compactDataGridCells: false,
    compactDataGridToolbar: false,
    compactTreeItems: false,
};

const DENSE_ADVANCED_DENSITY_CONTROLS: AdvancedDensityControls = {
    ...DEFAULT_ADVANCED_DENSITY_CONTROLS,
    compactButtonsAndChips: true,
    compactIconButtons: true,
    compactInputs: true,
    compactListsAndMenus: true,
    compactAccordionSummary: true,
    compactTableCells: true,
    compactTreeItems: true,
};

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

const THEME_OVERRIDE_CONTROLS: AdvancedControlDefinition[] = [
    {
        key: 'compactButtonsAndChips',
        label: 'Tighten button and chip padding',
        mechanism: 'Theme override: MuiButton and MuiChip styleOverrides',
        description: 'Shrinks action padding and chip label chrome without changing public size props.',
    },
    {
        key: 'compactIconButtons',
        label: 'Tighten icon button box size',
        mechanism: 'Theme override: MuiIconButton styleOverrides',
        description: 'Reduces icon-button padding so compact actions consume less area.',
    },
    {
        key: 'compactInputs',
        label: 'Tighten input root and text padding',
        mechanism: 'Theme override: MuiInputBase, MuiOutlinedInput, MuiFilledInput styleOverrides',
        description: 'Compacts text-entry shells and helper spacing beyond the public size props.',
    },
    {
        key: 'compactListsAndMenus',
        label: 'Tighten menu and list rows',
        mechanism: 'Theme override: MuiMenuItem, MuiListItemButton, MuiListSubheader styleOverrides',
        description: 'Reduces list-like row height and padding with slot-aware overrides.',
    },
    {
        key: 'compactAccordionSummary',
        label: 'Tighten accordion summary spacing',
        mechanism: 'Theme override: MuiAccordionSummary styleOverrides',
        description: 'Shrinks the accordion summary row without touching undocumented descendants.',
    },
    {
        key: 'compactTableCells',
        label: 'Tighten table cell padding',
        mechanism: 'Theme override: MuiTableCell styleOverrides',
        description: 'Compacts table rows by trimming head and body cell padding.',
    },
];

const UTILITY_AND_SLOT_CONTROLS: AdvancedControlDefinition[] = [
    {
        key: 'compactDataGridCells',
        label: 'Tighten Data Grid cells and headers',
        mechanism: 'Utility classes: MuiDataGrid root selectors using exported gridClasses',
        description: 'Uses documented grid utility classes to trim header and cell padding.',
    },
    {
        key: 'compactDataGridToolbar',
        label: 'Compact Data Grid toolbar and quick filter',
        mechanism: 'Slot props: toolbar, quickFilterProps, baseButton, baseIconButton, baseTextField',
        description:
            'Uses documented slot props to tighten the toolbar controls without swapping components.',
    },
    {
        key: 'compactTreeItems',
        label: 'Tighten tree item layout and states',
        mechanism: 'MuiTreeItem overrides, treeItemClasses, and Tree data-* state hooks',
        description: 'Shrinks tree-item content, icon, label, and stateful rows through documented hooks.',
    },
];

const ALL_ADVANCED_CONTROLS: AdvancedControlDefinition[] = [
    ...THEME_OVERRIDE_CONTROLS,
    ...UTILITY_AND_SLOT_CONTROLS,
];

const DENSITY_PRESETS: Record<DensityPreset, DensityControls> = {
    default: {
        spacingBase: 8,
        layoutScale: 1,
        typographyScale: 1,
        componentSize: 'medium',
        denseFormMargins: false,
        disableGlobalGutters: false,
        denseLists: false,
        listDisablePadding: false,
        toolbarDense: false,
        toolbarDisableGutters: false,
        tableSize: 'medium',
        imageGap: 12,
        dataGridDensity: 'standard',
        dataGridHeaderFilters: false,
        dataGridHeaderFilterHeight: 52,
        treeIndentation: 24,
    },
    dense: {
        spacingBase: 4,
        layoutScale: 0.2,
        typographyScale: 1,
        componentSize: 'small',
        denseFormMargins: true,
        disableGlobalGutters: true,
        denseLists: true,
        listDisablePadding: true,
        toolbarDense: true,
        toolbarDisableGutters: true,
        tableSize: 'small',
        imageGap: 4,
        dataGridDensity: 'compact',
        dataGridHeaderFilters: false,
        dataGridHeaderFilterHeight: 52,
        treeIndentation: 12,
    },
    densePlus: {
        spacingBase: 2,
        layoutScale: 0.45,
        typographyScale: 0.65,
        componentSize: 'small',
        denseFormMargins: true,
        disableGlobalGutters: true,
        denseLists: true,
        listDisablePadding: true,
        toolbarDense: true,
        toolbarDisableGutters: true,
        tableSize: 'small',
        imageGap: 0,
        dataGridDensity: 'compact',
        dataGridHeaderFilters: true,
        dataGridHeaderFilterHeight: 24,
        treeIndentation: 0,
    },
};

const ADVANCED_DENSITY_PRESETS: Record<DensityPreset, AdvancedDensityControls> = {
    default: DEFAULT_ADVANCED_DENSITY_CONTROLS,
    dense: DENSE_ADVANCED_DENSITY_CONTROLS,
    densePlus: DEFAULT_ADVANCED_DENSITY_CONTROLS,
};

const ROUTE_OPTIONS: RouteOption[] = [
    { label: 'NA eastbound', region: 'North America', density: 'Balanced' },
    { label: 'EU priority', region: 'Europe', density: 'Comfortable' },
    { label: 'APAC returns', region: 'Asia Pacific', density: 'Compact candidate' },
    { label: 'Cross-dock exceptions', region: 'Global', density: 'Dense candidate' },
];

function renderShipmentTextCell(params: GridRenderCellParams<ShipmentRow>) {
    const value = String(params.formattedValue ?? params.value ?? '');

    return (
        <Box
            component="span"
            sx={{
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                lineHeight: 1.15,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transform: 'translateY(2px)',
                whiteSpace: 'nowrap',
                width: '100%',
            }}
        >
            {value}
        </Box>
    );
}

function renderShipmentHeader(params: GridColumnHeaderParams<ShipmentRow>) {
    return (
        <Box
            component="span"
            sx={{
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                lineHeight: 1.15,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transform: 'translateY(2px)',
                whiteSpace: 'nowrap',
                width: '100%',
            }}
        >
            {params.colDef.headerName ?? params.field}
        </Box>
    );
}

const SHIPMENT_COLUMNS: GridColDef<ShipmentRow>[] = [
    {
        field: 'lane',
        headerName: 'Lane',
        flex: 1.2,
        minWidth: 160,
        renderCell: renderShipmentTextCell,
        renderHeader: renderShipmentHeader,
    },
    {
        field: 'stage',
        headerName: 'Stage',
        flex: 1,
        minWidth: 140,
        renderCell: renderShipmentTextCell,
        renderHeader: renderShipmentHeader,
    },
    {
        field: 'eta',
        headerName: 'ETA',
        flex: 0.8,
        minWidth: 120,
        renderCell: renderShipmentTextCell,
        renderHeader: renderShipmentHeader,
    },
    {
        field: 'owner',
        headerName: 'Owner',
        flex: 1,
        minWidth: 140,
        renderCell: renderShipmentTextCell,
        renderHeader: renderShipmentHeader,
    },
    {
        field: 'risk',
        headerName: 'Risk',
        flex: 0.7,
        minWidth: 110,
        renderCell: renderShipmentTextCell,
        renderHeader: renderShipmentHeader,
    },
];

const SHIPMENT_ROWS: ShipmentRow[] = [
    { id: 1, lane: 'ATL to LHR', stage: 'Manifest audit', eta: '08:40', owner: 'M. Wu', risk: 'Low' },
    { id: 2, lane: 'JFK to AMS', stage: 'Gate hold', eta: '09:15', owner: 'L. Patel', risk: 'High' },
    { id: 3, lane: 'SFO to NRT', stage: 'Booked', eta: '11:05', owner: 'R. Gomez', risk: 'Low' },
    { id: 4, lane: 'ORD to GRU', stage: 'Security review', eta: '13:20', owner: 'A. Tran', risk: 'Medium' },
    { id: 5, lane: 'SEA to SYD', stage: 'Transfer', eta: '14:35', owner: 'J. Kim', risk: 'Medium' },
    { id: 6, lane: 'MIA to MAD', stage: 'Released', eta: '16:10', owner: 'D. Singh', risk: 'Low' },
];

const COMMUNITY_RICH_TREE_ITEMS: TreeDemoItem[] = [
    {
        id: 'rich-workstation',
        label: 'Workstation layout',
        children: [
            {
                id: 'rich-overview',
                label: 'Overview',
                children: [
                    { id: 'rich-overview-summary', label: 'KPI strip' },
                    { id: 'rich-overview-alerts', label: 'Alert stack' },
                ],
            },
            {
                id: 'rich-queues',
                label: 'Queues',
                children: [
                    { id: 'rich-queues-import', label: 'Import exceptions' },
                    { id: 'rich-queues-export', label: 'Export release' },
                ],
            },
        ],
    },
    {
        id: 'rich-analytics',
        label: 'Analytics',
        children: [
            { id: 'rich-analytics-capacity', label: 'Lane capacity' },
            { id: 'rich-analytics-aging', label: 'Aging buckets' },
        ],
    },
];

const PRO_TREE_ITEMS: TreeDemoItem[] = [
    {
        id: 'pro-control-room',
        label: 'Control room',
        children: [
            { id: 'pro-control-overview', label: 'Overview wall' },
            { id: 'pro-control-incidents', label: 'Incident desk' },
            { id: 'pro-control-handoffs', label: 'Handoff tracker' },
        ],
    },
    {
        id: 'pro-floor',
        label: 'Floor operations',
        children: [
            { id: 'pro-floor-intake', label: 'Intake' },
            { id: 'pro-floor-sort', label: 'Sort' },
            { id: 'pro-floor-release', label: 'Release' },
        ],
    },
    {
        id: 'pro-history',
        label: 'History and audit',
        children: [
            { id: 'pro-history-events', label: 'Event timeline' },
            { id: 'pro-history-edits', label: 'Manual edits' },
        ],
    },
];

const IMAGE_TILES = [
    {
        src: createTileDataUri('#0f766e', '#34d399', 'North Hub'),
        title: 'North Hub',
        subtitle: 'Cold-chain staging',
    },
    {
        src: createTileDataUri('#2563eb', '#60a5fa', 'EU Relay'),
        title: 'EU Relay',
        subtitle: 'Freight handoff',
    },
    {
        src: createTileDataUri('#b45309', '#f59e0b', 'Returns'),
        title: 'Returns',
        subtitle: 'Inspection lane',
    },
    {
        src: createTileDataUri('#7c3aed', '#a78bfa', 'Exception Desk'),
        title: 'Exception Desk',
        subtitle: 'Escalation routing',
    },
];

function createTileDataUri(start: string, end: string, label: string) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
            <defs>
                <linearGradient id="tile-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="${start}" />
                    <stop offset="100%" stop-color="${end}" />
                </linearGradient>
            </defs>
            <rect width="240" height="180" rx="18" fill="url(#tile-gradient)" />
            <path d="M24 128h192" stroke="rgba(255,255,255,0.45)" stroke-width="10" stroke-linecap="round" />
            <circle cx="72" cy="72" r="24" fill="rgba(255,255,255,0.25)" />
            <circle cx="168" cy="96" r="36" fill="rgba(255,255,255,0.18)" />
            <text x="24" y="38" fill="white" font-size="20" font-family="sans-serif">${label}</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function Section({
    id,
    title,
    description,
    children,
}: {
    id: string;
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <section className="mui-dense-section" id={id}>
            <div className="mui-dense-section__heading">
                <Typography variant="h4" component="h2">
                    {title}
                </Typography>
                <Typography color="textSecondary">{description}</Typography>
            </div>
            <div className="mui-dense-gallery">{children}</div>
        </section>
    );
}

function DemoCard({
    title,
    components,
    children,
    wide = false,
}: {
    title: string;
    components: string;
    children: ReactNode;
    wide?: boolean;
}) {
    return (
        <article className={wide ? 'mui-dense-demo mui-dense-demo--wide' : 'mui-dense-demo'}>
            <div className="mui-dense-demo__header">
                <Typography variant="h6" component="h3">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {components}
                </Typography>
            </div>
            <div className="mui-dense-demo__body">{children}</div>
        </article>
    );
}

function ChevronIcon() {
    return (
        <SvgIcon fontSize="small">
            <path d="M7 10l5 5 5-5z" />
        </SvgIcon>
    );
}

function SparkIcon() {
    return (
        <SvgIcon fontSize="small">
            <path d="M12 2l2.3 5.2L20 9l-5.7 1.8L12 16l-2.3-5.2L4 9l5.7-1.8z" />
        </SvgIcon>
    );
}

function RouteIcon() {
    return (
        <SvgIcon fontSize="small">
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="18" cy="18" r="3" />
            <path d="M8.5 11l6-3M8.5 13l6 3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </SvgIcon>
    );
}

function GridCellsIcon() {
    return (
        <SvgIcon fontSize="small">
            <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" />
        </SvgIcon>
    );
}

function BeaconIcon() {
    return (
        <SvgIcon fontSize="small">
            <circle cx="12" cy="12" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.75" />
            <circle cx="12" cy="12" r="2.25" />
            <path
                d="M12 2.75v3.25M12 18v3.25M2.75 12H6M18 12h3.25"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.75"
            />
        </SvgIcon>
    );
}

const COMPACT_TAB_SX = {
    minHeight: 40,
    minWidth: 0,
    px: 1.5,
    py: 0.75,
} as const;

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

function parsePixelValue(value: string, fallback: number) {
    const parsed = Number.parseFloat(value);

    return Number.isFinite(parsed) ? parsed : fallback;
}

function snapToDevicePixel(value: number, devicePixelRatio: number) {
    const safeDevicePixelRatio = devicePixelRatio > 0 ? devicePixelRatio : 1;

    return Number((Math.ceil(value * safeDevicePixelRatio) / safeDevicePixelRatio).toFixed(2));
}

function formatPixelValue(value: number) {
    return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.?0+$/, '');
}

function createFallbackAutoDataGridMetrics(
    typographyScale: number,
    devicePixelRatio: number,
): AutoDataGridMetrics {
    const baseBodyFontSize = 14 * typographyScale;
    const textLineHeight = baseBodyFontSize * 1.43;
    const xHeight = baseBodyFontSize * 0.57;
    const autoHeight = snapToDevicePixel(textLineHeight + xHeight + 2, devicePixelRatio);

    return {
        checkboxHeight: 0,
        columnHeaderHeight: autoHeight,
        devicePixelRatio,
        rowHeight: autoHeight,
        textLineHeight,
        xHeight,
    };
}

function getPreferredColorMode(): GalleryColorMode {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function createDensityTheme(
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

function createAdvancedDensityThemeOptions(controls: AdvancedDensityControls) {
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

function DensityControlCard({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <Paper className="mui-dense-density-card" variant="outlined">
            <Stack spacing={1}>
                <div className="mui-dense-density-card__copy">
                    <Typography variant="subtitle2">{title}</Typography>
                    <Typography color="textSecondary" variant="body2">
                        {description}
                    </Typography>
                </div>
                {children}
            </Stack>
        </Paper>
    );
}

function AdvancedControlTile({
    checked,
    definition,
    onChange,
}: {
    checked: boolean;
    definition: AdvancedControlDefinition;
    onChange: (nextValue: boolean) => void;
}) {
    return (
        <Paper className="mui-dense-advanced-card" variant="outlined">
            <Stack spacing={1}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            inputProps={{ 'aria-label': definition.label }}
                            onChange={event => {
                                onChange(event.target.checked);
                            }}
                        />
                    }
                    label={definition.label}
                />
                <Typography color="textSecondary" variant="caption">
                    {definition.mechanism}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {definition.description}
                </Typography>
            </Stack>
        </Paper>
    );
}

export function App() {
    const proTreeApiRef = useRichTreeViewProApiRef<TreeDemoItem>();
    const [densityControls, setDensityControls] = useState<DensityControls>(DENSITY_PRESETS.dense);
    const [densityPreset, setDensityPreset] = useState<DensityPresetSelection>('dense');
    const [colorMode, setColorMode] = useState<GalleryColorMode>(() => getPreferredColorMode());
    const [animationsDisabled, setAnimationsDisabled] = useState(true);
    const [advancedDensityControls, setAdvancedDensityControls] = useState<AdvancedDensityControls>(
        DENSE_ADVANCED_DENSITY_CONTROLS,
    );
    const [routeValue, setRouteValue] = useState<RouteOption | null>(ROUTE_OPTIONS[2]);
    const [densityChoice, setDensityChoice] = useState('comfortable');
    const [nativeDensityChoice, setNativeDensityChoice] = useState('comfortable');
    const [radioValue, setRadioValue] = useState('balanced');
    const [toggleValue, setToggleValue] = useState('table');
    const [ratingValue, setRatingValue] = useState<number | null>(4);
    const [sliderValue, setSliderValue] = useState<number[]>([18, 62]);
    const [tabValue, setTabValue] = useState(0);
    const [navValue, setNavValue] = useState('overview');
    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [stepValue, setStepValue] = useState(1);
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(null);
    const [popperAnchorEl, setPopperAnchorEl] = useState<HTMLElement | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [swipeableDrawerOpen, setSwipeableDrawerOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(true);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const [clickedAway, setClickedAway] = useState(false);
    const [trapFocusOpen, setTrapFocusOpen] = useState(false);
    const [portalTarget, setPortalTarget] = useState<HTMLDivElement | null>(null);
    const [proTreeItems, setProTreeItems] = useState<TreeDemoItem[]>(PRO_TREE_ITEMS);
    const [treeMoveSummary, setTreeMoveSummary] = useState('Drag items in the Pro tree to reorder them.');
    const [devicePixelRatio, setDevicePixelRatio] = useState(() =>
        typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
    );
    const [autoDataGridMetrics, setAutoDataGridMetrics] = useState<AutoDataGridMetrics>(() =>
        createFallbackAutoDataGridMetrics(
            DENSITY_PRESETS.default.typographyScale,
            typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
        ),
    );
    const dataGridRootRef = useRef<HTMLDivElement | null>(null);
    const dataGridBody2ProbeRef = useRef<HTMLSpanElement | null>(null);
    const dataGridExProbeRef = useRef<HTMLSpanElement | null>(null);

    const menuOpen = Boolean(menuAnchorEl);
    const popoverOpen = Boolean(popoverAnchorEl);
    const popperOpen = Boolean(popperAnchorEl);
    const baseDensityTheme = useMemo(
        () => createDensityTheme(densityControls, colorMode, animationsDisabled),
        [animationsDisabled, colorMode, densityControls],
    );
    const densityTheme = useMemo(
        () => createTheme(baseDensityTheme, createAdvancedDensityThemeOptions(advancedDensityControls)),
        [advancedDensityControls, baseDensityTheme],
    );
    const currentColorModeLabel = colorMode === 'dark' ? 'Dark' : 'Light';
    const currentAnimationModeLabel = animationsDisabled ? 'Off' : 'On';
    const activeAdvancedControls = ALL_ADVANCED_CONTROLS.filter(
        definition => advancedDensityControls[definition.key],
    );
    const dataGridSlotProps: DataGridProProps<ShipmentRow>['slotProps'] =
        advancedDensityControls.compactDataGridToolbar
            ? {
                  baseButton: { size: 'small' },
                  baseIconButton: { size: 'small' },
                  baseTextField: { size: 'small' },
                  toolbar: {
                      quickFilterProps: {
                          slotProps: {
                              root: {
                                  size: 'small',
                              },
                          },
                      },
                      showQuickFilter: true,
                  },
              }
            : undefined;
    const scaleSpacing = (value: number) =>
        Math.max(0.5, Number((value * densityControls.layoutScale).toFixed(2)));
    const formattedAutoDataGridRowHeight = `${formatPixelValue(autoDataGridMetrics.rowHeight)}px`;
    const formattedAutoDataGridColumnHeaderHeight = `${formatPixelValue(
        autoDataGridMetrics.columnHeaderHeight,
    )}px`;

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const syncDevicePixelRatio = () => {
            setDevicePixelRatio(window.devicePixelRatio || 1);
        };

        syncDevicePixelRatio();
        window.addEventListener('resize', syncDevicePixelRatio);
        window.visualViewport?.addEventListener('resize', syncDevicePixelRatio);

        return () => {
            window.removeEventListener('resize', syncDevicePixelRatio);
            window.visualViewport?.removeEventListener('resize', syncDevicePixelRatio);
        };
    }, []);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const body2Probe = dataGridBody2ProbeRef.current;
        const exProbe = dataGridExProbeRef.current;

        if (body2Probe === null || exProbe === null) {
            return undefined;
        }

        const frame = window.requestAnimationFrame(() => {
            const computedStyles = window.getComputedStyle(body2Probe);
            const fallbackBodyFontSize = 14 * densityControls.typographyScale;
            const textLineHeight = parsePixelValue(computedStyles.lineHeight, fallbackBodyFontSize * 1.43);
            const xHeight = exProbe.getBoundingClientRect().height || fallbackBodyFontSize * 0.57;
            const checkboxProbe = dataGridRootRef.current?.querySelector<HTMLElement>(
                `.${gridClasses.cellCheckbox} .MuiSvgIcon-root, .${gridClasses.columnHeaderCheckbox} .MuiSvgIcon-root`,
            );
            const checkboxHeight = checkboxProbe?.getBoundingClientRect().height ?? 0;
            const computedHeight = snapToDevicePixel(
                Math.max(textLineHeight + xHeight + 2, checkboxHeight > 0 ? checkboxHeight + 6 : 0),
                devicePixelRatio,
            );

            setAutoDataGridMetrics(current => {
                if (
                    current.devicePixelRatio === devicePixelRatio &&
                    Math.abs(current.rowHeight - computedHeight) < 0.01 &&
                    Math.abs(current.columnHeaderHeight - computedHeight) < 0.01 &&
                    Math.abs(current.textLineHeight - textLineHeight) < 0.01 &&
                    Math.abs(current.xHeight - xHeight) < 0.01 &&
                    Math.abs(current.checkboxHeight - checkboxHeight) < 0.01
                ) {
                    return current;
                }

                return {
                    checkboxHeight: Number(checkboxHeight.toFixed(2)),
                    columnHeaderHeight: computedHeight,
                    devicePixelRatio,
                    rowHeight: computedHeight,
                    textLineHeight: Number(textLineHeight.toFixed(2)),
                    xHeight: Number(xHeight.toFixed(2)),
                };
            });
        });

        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, [densityControls.dataGridDensity, densityControls.typographyScale, devicePixelRatio]);

    const applyDensityPreset = (preset: DensityPreset) => {
        setDensityControls(DENSITY_PRESETS[preset]);
        setAdvancedDensityControls(ADVANCED_DENSITY_PRESETS[preset]);
        setDensityPreset(preset);
    };

    const updateDensityControl = <Key extends keyof DensityControls>(
        key: Key,
        value: DensityControls[Key],
    ) => {
        setDensityPreset('custom');
        setDensityControls(current => ({
            ...current,
            [key]: value,
        }));
    };

    const updateAdvancedDensityControl = <Key extends keyof AdvancedDensityControls>(
        key: Key,
        value: AdvancedDensityControls[Key],
    ) => {
        setAdvancedDensityControls(current => ({
            ...current,
            [key]: value,
        }));
    };

    const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handlePopoverOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setPopoverAnchorEl(event.currentTarget);
    };

    const handlePopperOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setPopperAnchorEl(current => (current ? null : event.currentTarget));
    };

    return (
        <ThemeProvider theme={densityTheme}>
            <CssBaseline />

            <div className="mui-dense-app" data-mui-dense-color-mode={colorMode}>
                <AppBar position="static">
                    <Toolbar>
                        <div className="mui-dense-toolbar-layout">
                            <div>
                                <Typography variant="h6">MUI Dense Gallery</Typography>
                                <Typography variant="body2">
                                    Public-knob MUI components for density evaluation.
                                </Typography>
                            </div>

                            <div className="mui-dense-toolbar-links">
                                <Button color="inherit" href="#inputs">
                                    Inputs
                                </Button>
                                <Button color="inherit" href="#data-display">
                                    Data display
                                </Button>
                                <Button color="inherit" href="#overlays">
                                    Overlays
                                </Button>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>

                <Container className="mui-dense-shell" maxWidth="xl">
                    <div className="mui-dense-workspace">
                        <aside aria-label="UI controls sidebar" className="mui-dense-sidebar">
                            <Stack className="mui-dense-sidebar__scroller" spacing={2}>
                                <Paper className="mui-dense-density-panel" variant="outlined">
                                    <Stack spacing={2}>
                                        <div className="mui-dense-density-panel__header">
                                            <div>
                                                <Typography component="h2" variant="h5">
                                                    Gallery Controls
                                                </Typography>
                                                <Typography color="textSecondary" variant="body2">
                                                    Gallery-wide public controls: palette mode, theme spacing
                                                    and typography, default component props, and direct
                                                    supported props on the current demos.
                                                </Typography>
                                            </div>

                                            <Button
                                                onClick={() => {
                                                    applyDensityPreset('default');
                                                    setAnimationsDisabled(false);
                                                    setColorMode(getPreferredColorMode());
                                                }}
                                                variant="outlined"
                                            >
                                                Reset to default
                                            </Button>
                                        </div>

                                        <div className="mui-dense-density-primary">
                                            <DensityControlCard
                                                description="Gallery-wide appearance toggles for palette mode and motion. Disabling animations zeroes MUI transition durations, removes ripples, and suppresses CSS animations."
                                                title="Appearance"
                                            >
                                                <Stack spacing={1}>
                                                    <Typography variant="body2">
                                                        Mode: {currentColorModeLabel}
                                                    </Typography>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={colorMode === 'dark'}
                                                                onChange={event => {
                                                                    setColorMode(
                                                                        event.target.checked
                                                                            ? 'dark'
                                                                            : 'light',
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label="Dark mode"
                                                    />
                                                    <Typography variant="body2">
                                                        Animations: {currentAnimationModeLabel}
                                                    </Typography>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={animationsDisabled}
                                                                onChange={event => {
                                                                    setAnimationsDisabled(
                                                                        event.target.checked,
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label="Disable animations"
                                                    />
                                                </Stack>
                                            </DensityControlCard>

                                            <DensityControlCard
                                                description="Applies a baseline bundle of public density controls before any fine-tuning below."
                                                title="Density Preset"
                                            >
                                                <div className="mui-dense-density-panel__preset-row">
                                                    <ButtonGroup
                                                        aria-label="Density presets"
                                                        fullWidth
                                                        variant="outlined"
                                                    >
                                                        {(
                                                            [
                                                                'default',
                                                                'dense',
                                                                'densePlus',
                                                            ] as DensityPreset[]
                                                        ).map(preset => (
                                                            <Button
                                                                key={preset}
                                                                onClick={() => {
                                                                    applyDensityPreset(preset);
                                                                }}
                                                                variant={
                                                                    densityPreset === preset
                                                                        ? 'contained'
                                                                        : 'outlined'
                                                                }
                                                            >
                                                                {DENSITY_PRESET_LABELS[preset]}
                                                            </Button>
                                                        ))}
                                                    </ButtonGroup>
                                                </div>
                                            </DensityControlCard>
                                        </div>

                                        <div className="mui-dense-density-grid">
                                            <DensityControlCard
                                                description="Toolkit-wide spacing unit used by Stack, Grid, Box, and many component internals."
                                                title="Spacing Base"
                                            >
                                                <Typography variant="body2">
                                                    Spacing base: {densityControls.spacingBase}px
                                                </Typography>
                                                <Slider
                                                    marks
                                                    max={8}
                                                    min={2}
                                                    onChange={(_event, value) => {
                                                        updateDensityControl('spacingBase', value as number);
                                                    }}
                                                    step={1}
                                                    value={densityControls.spacingBase}
                                                    valueLabelDisplay="auto"
                                                />
                                            </DensityControlCard>

                                            <DensityControlCard
                                                description="Scales MUI's base typography size so the default variant ratios derive as usual throughout the gallery."
                                                title="Typography Scale"
                                            >
                                                <Typography variant="body2">
                                                    Typography:{' '}
                                                    {Math.round(densityControls.typographyScale * 100)}%
                                                </Typography>
                                                <Slider
                                                    marks
                                                    max={1}
                                                    min={0.65}
                                                    onChange={(_event, value) => {
                                                        updateDensityControl(
                                                            'typographyScale',
                                                            value as number,
                                                        );
                                                    }}
                                                    step={0.05}
                                                    value={densityControls.typographyScale}
                                                    valueLabelDisplay="auto"
                                                />
                                            </DensityControlCard>

                                            <DensityControlCard
                                                description="Uses supported size and margin props across the main component families already on the page."
                                                title="Component Defaults"
                                            >
                                                <Stack spacing={1}>
                                                    <FormControl size="small">
                                                        <InputLabel id="mui-dense-control-size-label">
                                                            Component size
                                                        </InputLabel>
                                                        <Select
                                                            label="Component size"
                                                            labelId="mui-dense-control-size-label"
                                                            onChange={event => {
                                                                updateDensityControl(
                                                                    'componentSize',
                                                                    event.target.value as 'small' | 'medium',
                                                                );
                                                            }}
                                                            value={densityControls.componentSize}
                                                        >
                                                            <MenuItem value="medium">Medium</MenuItem>
                                                            <MenuItem value="small">Small</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={densityControls.denseFormMargins}
                                                                onChange={event => {
                                                                    updateDensityControl(
                                                                        'denseFormMargins',
                                                                        event.target.checked,
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label="Dense form margins"
                                                    />

                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={densityControls.disableGlobalGutters}
                                                                onChange={event => {
                                                                    updateDensityControl(
                                                                        'disableGlobalGutters',
                                                                        event.target.checked,
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label="Disable global gutters"
                                                    />
                                                </Stack>
                                            </DensityControlCard>

                                            <DensityControlCard
                                                description="Supported props on list-like components, toolbars, and tables already shown on the page."
                                                title="Page Surfaces"
                                            >
                                                <Stack spacing={1}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={densityControls.denseLists}
                                                                onChange={event => {
                                                                    updateDensityControl(
                                                                        'denseLists',
                                                                        event.target.checked,
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label="Dense lists and menu lists"
                                                    />

                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={densityControls.listDisablePadding}
                                                                onChange={event => {
                                                                    updateDensityControl(
                                                                        'listDisablePadding',
                                                                        event.target.checked,
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label="Disable list padding"
                                                    />

                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={densityControls.toolbarDense}
                                                                onChange={event => {
                                                                    updateDensityControl(
                                                                        'toolbarDense',
                                                                        event.target.checked,
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label="Dense toolbar"
                                                    />

                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={
                                                                    densityControls.toolbarDisableGutters
                                                                }
                                                                onChange={event => {
                                                                    updateDensityControl(
                                                                        'toolbarDisableGutters',
                                                                        event.target.checked,
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label="Disable toolbar gutters"
                                                    />

                                                    <FormControl size="small">
                                                        <InputLabel id="mui-dense-table-size-label">
                                                            Table size
                                                        </InputLabel>
                                                        <Select
                                                            label="Table size"
                                                            labelId="mui-dense-table-size-label"
                                                            onChange={event => {
                                                                updateDensityControl(
                                                                    'tableSize',
                                                                    event.target.value as 'small' | 'medium',
                                                                );
                                                            }}
                                                            value={densityControls.tableSize}
                                                        >
                                                            <MenuItem value="medium">Medium</MenuItem>
                                                            <MenuItem value="small">Small</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Stack>
                                            </DensityControlCard>

                                            <DensityControlCard
                                                description="Directly changes the `spacing` props used by the page shell and representative layout demos."
                                                title="Layout Scale"
                                            >
                                                <Typography variant="body2">
                                                    Layout scale: {densityControls.layoutScale.toFixed(2)}x
                                                </Typography>
                                                <Slider
                                                    marks
                                                    max={1}
                                                    min={0.2}
                                                    onChange={(_event, value) => {
                                                        updateDensityControl('layoutScale', value as number);
                                                    }}
                                                    step={0.05}
                                                    value={densityControls.layoutScale}
                                                    valueLabelDisplay="auto"
                                                />
                                            </DensityControlCard>

                                            <DensityControlCard
                                                description="Public `gap` prop on the current `ImageList` demo. Tile height now follows the intrinsic image size."
                                                title="Image Tiles"
                                            >
                                                <Stack spacing={1}>
                                                    <Typography variant="body2">
                                                        Gap: {densityControls.imageGap}px
                                                    </Typography>
                                                    <Slider
                                                        max={12}
                                                        min={0}
                                                        onChange={(_event, value) => {
                                                            updateDensityControl('imageGap', value as number);
                                                        }}
                                                        step={1}
                                                        value={densityControls.imageGap}
                                                        valueLabelDisplay="auto"
                                                    />
                                                </Stack>
                                            </DensityControlCard>

                                            <DensityControlCard
                                                description="Supported DataGrid props for overall density, auto-sized row and header heights, and optional header filters."
                                                title="Data Grid Pro"
                                            >
                                                <Stack spacing={1}>
                                                    <FormControl size="small">
                                                        <InputLabel id="mui-dense-grid-density-label">
                                                            Grid density
                                                        </InputLabel>
                                                        <Select
                                                            label="Grid density"
                                                            labelId="mui-dense-grid-density-label"
                                                            onChange={event => {
                                                                updateDensityControl(
                                                                    'dataGridDensity',
                                                                    event.target.value as
                                                                        | 'comfortable'
                                                                        | 'standard'
                                                                        | 'compact',
                                                                );
                                                            }}
                                                            value={densityControls.dataGridDensity}
                                                        >
                                                            <MenuItem value="comfortable">
                                                                Comfortable
                                                            </MenuItem>
                                                            <MenuItem value="standard">Standard</MenuItem>
                                                            <MenuItem value="compact">Compact</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={
                                                                    densityControls.dataGridHeaderFilters
                                                                }
                                                                onChange={event => {
                                                                    updateDensityControl(
                                                                        'dataGridHeaderFilters',
                                                                        event.target.checked,
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label="Show header filters"
                                                    />

                                                    <Typography variant="body2">
                                                        Row height: {formattedAutoDataGridRowHeight} (auto)
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        Column header height:{' '}
                                                        {formattedAutoDataGridColumnHeaderHeight} (auto)
                                                    </Typography>
                                                    <Typography color="textSecondary" variant="caption">
                                                        Uses the live body text line-height, 1ex, checkbox
                                                        icon size, and DPR{' '}
                                                        {formatPixelValue(devicePixelRatio)}.
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        Header filter height:{' '}
                                                        {densityControls.dataGridHeaderFilterHeight}
                                                        px
                                                    </Typography>
                                                    <Slider
                                                        disabled={!densityControls.dataGridHeaderFilters}
                                                        max={52}
                                                        min={24}
                                                        onChange={(_event, value) => {
                                                            updateDensityControl(
                                                                'dataGridHeaderFilterHeight',
                                                                value as number,
                                                            );
                                                        }}
                                                        step={2}
                                                        value={densityControls.dataGridHeaderFilterHeight}
                                                        valueLabelDisplay="auto"
                                                    />
                                                </Stack>
                                            </DensityControlCard>

                                            <DensityControlCard
                                                description="Directly changes `itemChildrenIndentation` on the current tree demos."
                                                title="Tree View"
                                            >
                                                <Typography variant="body2">
                                                    Tree indentation: {densityControls.treeIndentation}px
                                                </Typography>
                                                <Slider
                                                    max={24}
                                                    min={0}
                                                    onChange={(_event, value) => {
                                                        updateDensityControl(
                                                            'treeIndentation',
                                                            value as number,
                                                        );
                                                    }}
                                                    step={2}
                                                    value={densityControls.treeIndentation}
                                                    valueLabelDisplay="auto"
                                                />
                                            </DensityControlCard>
                                        </div>
                                    </Stack>
                                </Paper>

                                <Paper className="mui-dense-advanced-panel" variant="outlined">
                                    <Stack spacing={2.5}>
                                        <div className="mui-dense-advanced-panel__header">
                                            <div>
                                                <Typography component="h2" variant="h5">
                                                    Advanced Density Controls
                                                </Typography>
                                                <Typography color="textSecondary" variant="body2">
                                                    Set 3 controls that layer on top of the current Set 1
                                                    density state through slot-aware theme overrides, exported
                                                    utility classes, and documented slot props.
                                                </Typography>
                                            </div>

                                            <Button
                                                onClick={() => {
                                                    setAdvancedDensityControls(
                                                        DEFAULT_ADVANCED_DENSITY_CONTROLS,
                                                    );
                                                }}
                                                variant="outlined"
                                            >
                                                Reset advanced controls
                                            </Button>
                                        </div>

                                        <Alert severity="warning" variant="outlined">
                                            These controls are more fragile than the plain prop-based layer
                                            above. Resetting here clears only Set 3 overrides and leaves the
                                            current Set 1 preset or custom state intact.
                                        </Alert>

                                        <Stack spacing={1}>
                                            <Typography variant="subtitle2">
                                                Active advanced overrides
                                            </Typography>
                                            <Typography color="textSecondary" variant="body2">
                                                {activeAdvancedControls.length > 0
                                                    ? `${activeAdvancedControls.length} advanced override${activeAdvancedControls.length === 1 ? '' : 's'} active.`
                                                    : 'No advanced overrides are active.'}
                                            </Typography>
                                            {activeAdvancedControls.length > 0 ? (
                                                <div className="mui-dense-advanced-summary">
                                                    {activeAdvancedControls.map(definition => (
                                                        <Chip
                                                            key={definition.key}
                                                            label={definition.label}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    ))}
                                                </div>
                                            ) : null}
                                        </Stack>

                                        <div className="mui-dense-advanced-groups">
                                            <section className="mui-dense-advanced-group">
                                                <div className="mui-dense-advanced-group__heading">
                                                    <Typography variant="subtitle1">
                                                        Theme Override Controls
                                                    </Typography>
                                                    <Typography color="textSecondary" variant="body2">
                                                        Representative Set 3 overrides driven through
                                                        `theme.components.*.styleOverrides`.
                                                    </Typography>
                                                </div>

                                                <div className="mui-dense-advanced-grid">
                                                    {THEME_OVERRIDE_CONTROLS.map(definition => (
                                                        <AdvancedControlTile
                                                            checked={advancedDensityControls[definition.key]}
                                                            definition={definition}
                                                            key={definition.key}
                                                            onChange={nextValue => {
                                                                updateAdvancedDensityControl(
                                                                    definition.key,
                                                                    nextValue,
                                                                );
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </section>

                                            <section className="mui-dense-advanced-group">
                                                <div className="mui-dense-advanced-group__heading">
                                                    <Typography variant="subtitle1">
                                                        Utility-Class and Slot Controls
                                                    </Typography>
                                                    <Typography color="textSecondary" variant="body2">
                                                        These stay on exported class names, documented slot
                                                        props, and Tree state hooks.
                                                    </Typography>
                                                </div>

                                                <div className="mui-dense-advanced-grid">
                                                    {UTILITY_AND_SLOT_CONTROLS.map(definition => (
                                                        <AdvancedControlTile
                                                            checked={advancedDensityControls[definition.key]}
                                                            definition={definition}
                                                            key={definition.key}
                                                            onChange={nextValue => {
                                                                updateAdvancedDensityControl(
                                                                    definition.key,
                                                                    nextValue,
                                                                );
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </section>
                                        </div>
                                    </Stack>
                                </Paper>
                            </Stack>
                        </aside>

                        <main className="mui-dense-main">
                            <div className="mui-dense-intro">
                                <div>
                                    <Typography component="h1" gutterBottom variant="h3">
                                        MUI Dense Gallery
                                    </Typography>
                                    <Typography variant="body1">
                                        This page now serves both as a baseline gallery and as a public-knob
                                        density lab for `@mui/material`, DataGrid Pro, and MUI X Tree View.
                                    </Typography>
                                </div>

                                <Alert severity={muiXLicenseConfigured ? 'success' : 'info'}>
                                    <AlertTitle>MUI X Pro license</AlertTitle>
                                    {muiXLicenseConfigured
                                        ? 'Loaded from VITE_MUI_X_LICENSE_KEY for this session.'
                                        : 'Set VITE_MUI_X_LICENSE_KEY in your shell or .env.local to supply a local license key for DataGrid Pro and Tree View Pro without committing it.'}
                                </Alert>

                                <Paper variant="outlined">
                                    <div className="mui-dense-toc">
                                        <Typography variant="subtitle2">Jump to a section</Typography>
                                        <div className="mui-dense-toc-links">
                                            <Link href="#inputs" underline="hover">
                                                Inputs
                                            </Link>
                                            <Link href="#data-display" underline="hover">
                                                Data display
                                            </Link>
                                            <Link href="#navigation" underline="hover">
                                                Navigation
                                            </Link>
                                            <Link href="#layout" underline="hover">
                                                Layout and surfaces
                                            </Link>
                                            <Link href="#overlays" underline="hover">
                                                Overlays and feedback
                                            </Link>
                                            <Link href="#utilities" underline="hover">
                                                Utilities
                                            </Link>
                                        </div>
                                    </div>
                                </Paper>
                            </div>

                            <div className="mui-dense-sections">
                                <Section
                                    description="Form controls, typed entry, and the main action surfaces."
                                    id="inputs"
                                    title="Inputs"
                                >
                                    <DemoCard
                                        components="TextField, Input, FilledInput, OutlinedInput, InputAdornment, InputBase, TextareaAutosize"
                                        title="Text entry"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <TextField
                                                defaultValue="Consolidated freight monitor"
                                                helperText="Standard TextField"
                                                label="Dashboard title"
                                            />

                                            <FormControl
                                                size={densityControls.componentSize}
                                                variant="standard"
                                            >
                                                <InputLabel htmlFor="mui-dense-standard-input">
                                                    Standard input
                                                </InputLabel>
                                                <Input
                                                    defaultValue="route-group-alpha"
                                                    id="mui-dense-standard-input"
                                                />
                                            </FormControl>

                                            <FormControl
                                                size={densityControls.componentSize}
                                                variant="filled"
                                            >
                                                <InputLabel htmlFor="mui-dense-filled-input">
                                                    Filled input
                                                </InputLabel>
                                                <FilledInput
                                                    defaultValue="inbound exception queue"
                                                    id="mui-dense-filled-input"
                                                />
                                            </FormControl>

                                            <Box
                                                sx={
                                                    advancedDensityControls.compactInputs
                                                        ? { pt: 1 }
                                                        : undefined
                                                }
                                            >
                                                <FormControl
                                                    size={densityControls.componentSize}
                                                    variant="outlined"
                                                >
                                                    <InputLabel htmlFor="mui-dense-outlined-input">
                                                        Outlined input
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        defaultValue="42 pallets"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                units
                                                            </InputAdornment>
                                                        }
                                                        id="mui-dense-outlined-input"
                                                        label="Outlined input"
                                                    />
                                                </FormControl>
                                            </Box>

                                            <Paper variant="outlined">
                                                <InputBase
                                                    defaultValue="sku: pending export review"
                                                    fullWidth
                                                    placeholder="InputBase search surface"
                                                />
                                            </Paper>

                                            <TextareaAutosize
                                                aria-label="Notes"
                                                defaultValue="TextareaAutosize keeps the native textarea feel while auto-expanding."
                                                minRows={3}
                                                placeholder="Paste notes"
                                            />
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="Autocomplete, Select, NativeSelect, FormControl, InputLabel, FormHelperText"
                                        title="Choice inputs"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <Autocomplete
                                                getOptionLabel={option => option.label}
                                                onChange={(_event, value) => {
                                                    setRouteValue(value);
                                                }}
                                                options={ROUTE_OPTIONS}
                                                renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        helperText="Autocomplete with a standard TextField renderer"
                                                        label="Route cluster"
                                                    />
                                                )}
                                                slotProps={{
                                                    paper: {
                                                        sx: {
                                                            '& .MuiAutocomplete-listbox': {
                                                                py: 0.5,
                                                            },
                                                            '& .MuiAutocomplete-option': {
                                                                minHeight: 36,
                                                                py: 0.5,
                                                            },
                                                        },
                                                    },
                                                }}
                                                value={routeValue}
                                            />

                                            <FormControl size={densityControls.componentSize}>
                                                <InputLabel id="mui-dense-select-label">
                                                    Density preset
                                                </InputLabel>
                                                <Select
                                                    label="Density preset"
                                                    labelId="mui-dense-select-label"
                                                    onChange={event => {
                                                        setDensityChoice(event.target.value);
                                                    }}
                                                    value={densityChoice}
                                                >
                                                    <MenuItem dense value="comfortable">
                                                        Comfortable
                                                    </MenuItem>
                                                    <MenuItem dense value="balanced">
                                                        Balanced
                                                    </MenuItem>
                                                    <MenuItem dense value="compact">
                                                        Compact candidate
                                                    </MenuItem>
                                                </Select>
                                                <FormHelperText>Standard MUI select menu</FormHelperText>
                                            </FormControl>

                                            <FormControl
                                                size={densityControls.componentSize}
                                                variant="standard"
                                            >
                                                <InputLabel htmlFor="mui-dense-native-select">
                                                    Native select
                                                </InputLabel>
                                                <NativeSelect
                                                    id="mui-dense-native-select"
                                                    onChange={event => {
                                                        setNativeDensityChoice(event.target.value);
                                                    }}
                                                    value={nativeDensityChoice}
                                                >
                                                    <option value="comfortable">Comfortable</option>
                                                    <option value="balanced">Balanced</option>
                                                    <option value="compact">Compact candidate</option>
                                                </NativeSelect>
                                                <FormHelperText>Browser-native select element</FormHelperText>
                                            </FormControl>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="Checkbox, FormGroup, FormControlLabel, Radio, RadioGroup, Switch, Slider, Rating, ToggleButton, ToggleButtonGroup"
                                        title="Selection controls"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            defaultChecked
                                                            size="small"
                                                            sx={{ py: 0.5 }}
                                                        />
                                                    }
                                                    label="Exception alerts"
                                                    sx={{ mr: 0 }}
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox size="small" sx={{ py: 0.5 }} />}
                                                    label="Dock health"
                                                    sx={{ mr: 0 }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            defaultChecked
                                                            size="small"
                                                            sx={{ py: 0.5 }}
                                                        />
                                                    }
                                                    label="Manifest validation"
                                                    sx={{ mr: 0 }}
                                                />
                                            </FormGroup>

                                            <FormControl>
                                                <FormLabel id="mui-dense-radio-group">
                                                    Density direction
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="mui-dense-radio-group"
                                                    onChange={event => {
                                                        setRadioValue(event.target.value);
                                                    }}
                                                    row
                                                    value={radioValue}
                                                >
                                                    <FormControlLabel
                                                        control={<Radio />}
                                                        label="Balanced"
                                                        value="balanced"
                                                    />
                                                    <FormControlLabel
                                                        control={<Radio />}
                                                        label="Compact"
                                                        value="compact"
                                                    />
                                                    <FormControlLabel
                                                        control={<Radio />}
                                                        label="Aggressive"
                                                        value="aggressive"
                                                    />
                                                </RadioGroup>
                                                <FormHelperText>
                                                    RadioGroup keeps labels and state wiring aligned.
                                                </FormHelperText>
                                            </FormControl>

                                            <FormControlLabel
                                                control={<Switch defaultChecked />}
                                                label="Live refresh enabled"
                                            />

                                            <div>
                                                <Typography gutterBottom variant="body2">
                                                    Density range
                                                </Typography>
                                                <Slider
                                                    onChange={(_event, value) => {
                                                        setSliderValue(value as number[]);
                                                    }}
                                                    value={sliderValue}
                                                    valueLabelDisplay="auto"
                                                />
                                            </div>

                                            <div>
                                                <Typography gutterBottom variant="body2">
                                                    Operator confidence
                                                </Typography>
                                                <Rating
                                                    onChange={(_event, value) => {
                                                        setRatingValue(value);
                                                    }}
                                                    value={ratingValue}
                                                />
                                            </div>

                                            <ToggleButtonGroup
                                                exclusive
                                                onChange={(_event, value: string | null) => {
                                                    if (value) {
                                                        setToggleValue(value);
                                                    }
                                                }}
                                                value={toggleValue}
                                            >
                                                <ToggleButton value="table">Table</ToggleButton>
                                                <ToggleButton value="cards">Cards</ToggleButton>
                                                <ToggleButton value="chart">Chart</ToggleButton>
                                            </ToggleButtonGroup>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="Button, ButtonGroup, ButtonBase, IconButton, Fab, Icon, SvgIcon"
                                        title="Action surfaces"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <Stack
                                                direction="row"
                                                spacing={scaleSpacing(1.5)}
                                                useFlexGap
                                                flexWrap="wrap"
                                            >
                                                <Button
                                                    data-testid="mui-dense-compact-button"
                                                    variant="contained"
                                                >
                                                    Primary action
                                                </Button>
                                                <Button variant="outlined">Secondary action</Button>
                                                <Button variant="text">Quiet action</Button>
                                            </Stack>

                                            <ButtonGroup aria-label="action group" variant="outlined">
                                                <Button>Review</Button>
                                                <Button>Assign</Button>
                                                <Button>Release</Button>
                                            </ButtonGroup>

                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={scaleSpacing(1.5)}
                                            >
                                                <IconButton
                                                    aria-label="Refresh route summary"
                                                    data-testid="mui-dense-compact-icon-button"
                                                >
                                                    <RouteIcon />
                                                </IconButton>
                                                <Fab color="primary">
                                                    <SparkIcon />
                                                </Fab>
                                                <ButtonBase focusRipple>Plain ButtonBase</ButtonBase>
                                            </Stack>

                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={scaleSpacing(2)}
                                            >
                                                <Icon
                                                    baseClassName=""
                                                    sx={{
                                                        alignItems: 'center',
                                                        display: 'inline-flex',
                                                        fontStyle: 'normal',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    ◎
                                                </Icon>
                                                <BeaconIcon />
                                                <Typography variant="body2" color="textSecondary">
                                                    `Icon` uses a plain glyph here because the Material icon
                                                    font is not bundled. `SvgIcon` renders a custom inline
                                                    SVG.
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </DemoCard>
                                </Section>

                                <Section
                                    description="Lists, tables, imagery, status indicators, and the Pro data grid."
                                    id="data-display"
                                    title="Data Display"
                                >
                                    <DemoCard
                                        components="Avatar, AvatarGroup, Badge, Chip, Tooltip, Typography, Divider, Link"
                                        title="Identity and inline display"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={scaleSpacing(2)}
                                            >
                                                <Badge badgeContent={7} color="primary">
                                                    <Avatar>WK</Avatar>
                                                </Badge>
                                                <AvatarGroup max={4}>
                                                    <Avatar>AL</Avatar>
                                                    <Avatar>BN</Avatar>
                                                    <Avatar>CR</Avatar>
                                                    <Avatar>DS</Avatar>
                                                    <Avatar>ET</Avatar>
                                                </AvatarGroup>
                                            </Stack>

                                            <Stack
                                                direction="row"
                                                spacing={scaleSpacing(1)}
                                                useFlexGap
                                                flexWrap="wrap"
                                            >
                                                <Chip color="primary" label="Live" />
                                                <Chip
                                                    data-testid="mui-dense-compact-chip"
                                                    label="Pending audit"
                                                    variant="outlined"
                                                />
                                                <Chip color="warning" label="Exception" variant="outlined" />
                                            </Stack>

                                            <Tooltip title="Tooltips remain interactive rather than always-open in the gallery">
                                                <Button variant="outlined">Hover for tooltip</Button>
                                            </Tooltip>

                                            <Divider />

                                            <Typography variant="subtitle1">Density baseline copy</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Material typography is intentionally roomy and calm. This
                                                baseline page is meant to make that feel tangible before
                                                trying to compress it.
                                            </Typography>
                                            <Link href="#layout" underline="hover">
                                                Jump to layout components
                                            </Link>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="List, ListSubheader, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemText, ListItemSecondaryAction, MenuList"
                                        title="Lists and menu lists"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <List subheader={<ListSubheader>Exception queues</ListSubheader>}>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>EX</Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="Customs review"
                                                        secondary="12 stuck consignments"
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Chip label="Escalated" />
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <GridCellsIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="Lane capacity"
                                                        secondary="Updated 3 minutes ago"
                                                    />
                                                </ListItemButton>
                                            </List>

                                            <MenuList>
                                                <MenuItem>Reassign owner</MenuItem>
                                                <MenuItem>Pause notifications</MenuItem>
                                                <MenuItem>Open lane history</MenuItem>
                                            </MenuList>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="ImageList, ImageListItem, ImageListItemBar, CardMedia"
                                        title="Images"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <ImageList
                                                cols={2}
                                                gap={densityControls.imageGap}
                                                sx={{
                                                    overflowY: 'visible',
                                                }}
                                            >
                                                {IMAGE_TILES.map(tile => (
                                                    <ImageListItem
                                                        key={tile.title}
                                                        sx={{
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        <img alt={tile.title} loading="lazy" src={tile.src} />
                                                        <ImageListItemBar
                                                            subtitle={tile.subtitle}
                                                            title={tile.title}
                                                        />
                                                    </ImageListItem>
                                                ))}
                                            </ImageList>

                                            <Card variant="outlined">
                                                <CardMedia
                                                    alt="Gradient preview tile"
                                                    component="img"
                                                    height="160"
                                                    image={IMAGE_TILES[0].src}
                                                />
                                            </Card>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="Alert, AlertTitle, CircularProgress, LinearProgress, Skeleton, SnackbarContent"
                                        title="Status and feedback visuals"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <Alert severity="warning">
                                                <AlertTitle>Review queued</AlertTitle>
                                                Lane ATL to LHR needs another pass before release.
                                            </Alert>

                                            <Stack direction="row" spacing={scaleSpacing(2)}>
                                                <CircularProgress />
                                                <div>
                                                    <LinearProgress />
                                                </div>
                                            </Stack>

                                            <Stack direction="row" spacing={scaleSpacing(2)}>
                                                <Skeleton height={56} variant="rounded" width={112} />
                                                <Skeleton variant="circular" width={48} height={48} />
                                                <Skeleton variant="text" width="45%" />
                                            </Stack>

                                            <SnackbarContent message="Local feedback surface without portal positioning" />
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="Table, TableContainer, TableHead, TableBody, TableFooter, TableRow, TableCell, TableSortLabel, TablePagination, TablePaginationActions, DataGridPro"
                                        title="Tables and DataGrid Pro"
                                        wide
                                    >
                                        <Stack spacing={scaleSpacing(3)}>
                                            <TableContainer component={Paper} variant="outlined">
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                <TableSortLabel active direction="asc">
                                                                    Lane
                                                                </TableSortLabel>
                                                            </TableCell>
                                                            <TableCell>Status</TableCell>
                                                            <TableCell align="right">Units</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow hover>
                                                            <TableCell>JFK to AMS</TableCell>
                                                            <TableCell>Queued</TableCell>
                                                            <TableCell align="right">48</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell>ATL to LHR</TableCell>
                                                            <TableCell>Released</TableCell>
                                                            <TableCell align="right">32</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell>SFO to NRT</TableCell>
                                                            <TableCell>Booked</TableCell>
                                                            <TableCell align="right">19</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                    <TableFooter>
                                                        <TableRow>
                                                            <TablePagination
                                                                ActionsComponent={TablePaginationActions}
                                                                count={128}
                                                                onPageChange={(_event, nextPage) => {
                                                                    setPage(nextPage);
                                                                }}
                                                                onRowsPerPageChange={event => {
                                                                    setRowsPerPage(
                                                                        Number.parseInt(
                                                                            event.target.value,
                                                                            10,
                                                                        ),
                                                                    );
                                                                    setPage(0);
                                                                }}
                                                                page={page}
                                                                rowsPerPage={rowsPerPage}
                                                                rowsPerPageOptions={[5, 10, 25]}
                                                                showFirstButton
                                                                showLastButton
                                                            />
                                                        </TableRow>
                                                    </TableFooter>
                                                </Table>
                                            </TableContainer>

                                            <div className="mui-dense-data-grid" ref={dataGridRootRef}>
                                                <DataGridPro
                                                    columnHeaderHeight={
                                                        autoDataGridMetrics.columnHeaderHeight
                                                    }
                                                    checkboxSelection
                                                    columns={SHIPMENT_COLUMNS}
                                                    disableRowSelectionOnClick
                                                    density={densityControls.dataGridDensity}
                                                    headerFilterHeight={
                                                        densityControls.dataGridHeaderFilterHeight
                                                    }
                                                    headerFilters={densityControls.dataGridHeaderFilters}
                                                    label="Shipment lanes"
                                                    pagination
                                                    rowHeight={autoDataGridMetrics.rowHeight}
                                                    rows={SHIPMENT_ROWS}
                                                    showToolbar
                                                    slotProps={dataGridSlotProps}
                                                    sx={{
                                                        backgroundColor: 'background.paper',
                                                        [`& .${gridClasses.columnHeaders}`]: {
                                                            backgroundColor: 'background.paper',
                                                        },
                                                        [`& .${gridClasses.columnHeader}`]: {
                                                            backgroundColor: 'background.paper',
                                                        },
                                                        [`& .${gridClasses.columnHeader} .${gridClasses.sortButton}`]:
                                                            {
                                                                backgroundColor: 'background.paper',
                                                            },
                                                        [`& .${gridClasses.columnHeaderTitleContainerContent}`]:
                                                            {
                                                                height: '100%',
                                                            },
                                                    }}
                                                />
                                            </div>
                                        </Stack>
                                    </DemoCard>
                                </Section>

                                <Section
                                    description="Tabs, tree views, stepper flows, navigation bars, paging, and breadcrumb structures."
                                    id="navigation"
                                    title="Navigation"
                                >
                                    <DemoCard
                                        components="Breadcrumbs, Tabs, Tab"
                                        title="Tabs and breadcrumb trails"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <Breadcrumbs aria-label="breadcrumb">
                                                <Link href="#inputs" underline="hover">
                                                    Experiments
                                                </Link>
                                                <Link href="#data-display" underline="hover">
                                                    MUI dense
                                                </Link>
                                                <Typography color="textPrimary">Baseline gallery</Typography>
                                            </Breadcrumbs>

                                            <Tabs
                                                allowScrollButtonsMobile
                                                onChange={(_event, value) => {
                                                    setTabValue(value);
                                                }}
                                                scrollButtons
                                                sx={{ minHeight: COMPACT_TAB_SX.minHeight }}
                                                value={tabValue}
                                                variant="scrollable"
                                            >
                                                <Tab label="Overview" sx={COMPACT_TAB_SX} />
                                                <Tab label="Queue detail" sx={COMPACT_TAB_SX} />
                                                <Tab label="Exceptions" sx={COMPACT_TAB_SX} />
                                                <Tab label="Audit trail" sx={COMPACT_TAB_SX} />
                                            </Tabs>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="@mui/x-tree-view: SimpleTreeView, RichTreeView, TreeItem; @mui/x-tree-view-pro: RichTreeViewPro"
                                        title="Tree views"
                                        wide
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <Typography variant="body2" color="textSecondary">
                                                The community package covers the basic and item-driven trees.
                                                The Pro sample below uses the same license key path as
                                                DataGrid Pro and enables item reordering.
                                            </Typography>

                                            <div className="mui-dense-tree-gallery">
                                                <Paper className="mui-dense-tree-panel" variant="outlined">
                                                    <Box p={2}>
                                                        <Stack spacing={scaleSpacing(1.5)}>
                                                            <div>
                                                                <Typography variant="subtitle2">
                                                                    SimpleTreeView
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    color="textSecondary"
                                                                >
                                                                    Hard-coded JSX tree.
                                                                </Typography>
                                                            </div>

                                                            <SimpleTreeView
                                                                aria-label="Simple control-room tree"
                                                                defaultExpandedItems={[
                                                                    'simple-control-room',
                                                                    'simple-floor-ops',
                                                                ]}
                                                                itemChildrenIndentation={
                                                                    densityControls.treeIndentation
                                                                }
                                                            >
                                                                <TreeItem
                                                                    itemId="simple-control-room"
                                                                    label="Control room"
                                                                >
                                                                    <TreeItem
                                                                        itemId="simple-wallboard"
                                                                        label="Wallboard"
                                                                    />
                                                                    <TreeItem
                                                                        itemId="simple-alert-desk"
                                                                        label="Alert desk"
                                                                    />
                                                                </TreeItem>
                                                                <TreeItem
                                                                    itemId="simple-floor-ops"
                                                                    label="Floor operations"
                                                                >
                                                                    <TreeItem
                                                                        itemId="simple-intake"
                                                                        label="Intake"
                                                                    />
                                                                    <TreeItem
                                                                        itemId="simple-sort"
                                                                        label="Sort"
                                                                    />
                                                                    <TreeItem
                                                                        itemId="simple-release"
                                                                        label="Release"
                                                                    />
                                                                </TreeItem>
                                                            </SimpleTreeView>
                                                        </Stack>
                                                    </Box>
                                                </Paper>

                                                <Paper className="mui-dense-tree-panel" variant="outlined">
                                                    <Box p={2}>
                                                        <Stack spacing={scaleSpacing(1.5)}>
                                                            <div>
                                                                <Typography variant="subtitle2">
                                                                    RichTreeView
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    color="textSecondary"
                                                                >
                                                                    Community item-driven tree using the
                                                                    `items` prop.
                                                                </Typography>
                                                            </div>

                                                            <RichTreeView
                                                                aria-label="Rich workstation tree"
                                                                defaultExpandedItems={[
                                                                    'rich-workstation',
                                                                    'rich-overview',
                                                                ]}
                                                                itemChildrenIndentation={
                                                                    densityControls.treeIndentation
                                                                }
                                                                items={COMMUNITY_RICH_TREE_ITEMS}
                                                            />
                                                        </Stack>
                                                    </Box>
                                                </Paper>

                                                <Paper className="mui-dense-tree-panel" variant="outlined">
                                                    <Box p={2}>
                                                        <Stack spacing={scaleSpacing(1.5)}>
                                                            <div>
                                                                <Typography variant="subtitle2">
                                                                    RichTreeViewPro
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    color="textSecondary"
                                                                >
                                                                    Pro tree with item reordering enabled.
                                                                </Typography>
                                                            </div>

                                                            <RichTreeViewPro
                                                                apiRef={proTreeApiRef}
                                                                aria-label="Pro control-room tree"
                                                                defaultExpandedItems={[
                                                                    'pro-control-room',
                                                                    'pro-floor',
                                                                ]}
                                                                itemChildrenIndentation={
                                                                    densityControls.treeIndentation
                                                                }
                                                                items={proTreeItems}
                                                                itemsReordering
                                                                onItemPositionChange={({
                                                                    itemId,
                                                                    oldPosition,
                                                                    newPosition,
                                                                }) => {
                                                                    const nextItems =
                                                                        proTreeApiRef.current?.getItemTree?.();

                                                                    if (nextItems) {
                                                                        setProTreeItems(nextItems);
                                                                    }

                                                                    setTreeMoveSummary(
                                                                        `${itemId}: ${oldPosition.parentId ?? 'root'}[${oldPosition.index}] -> ${newPosition.parentId ?? 'root'}[${newPosition.index}]`,
                                                                    );
                                                                }}
                                                            />

                                                            <Typography
                                                                variant="caption"
                                                                color="textSecondary"
                                                            >
                                                                {muiXLicenseConfigured
                                                                    ? treeMoveSummary
                                                                    : 'No local license key is configured, so MUI X will show its normal Pro warning until one is supplied.'}
                                                            </Typography>
                                                        </Stack>
                                                    </Box>
                                                </Paper>
                                            </div>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="BottomNavigation, BottomNavigationAction, Pagination, PaginationItem"
                                        title="Paging and destination switching"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <BottomNavigation
                                                onChange={(_event, value) => {
                                                    setNavValue(value);
                                                }}
                                                showLabels
                                                value={navValue}
                                            >
                                                <BottomNavigationAction
                                                    icon={<RouteIcon />}
                                                    label="Overview"
                                                    value="overview"
                                                />
                                                <BottomNavigationAction
                                                    icon={<GridCellsIcon />}
                                                    label="Tables"
                                                    value="tables"
                                                />
                                                <BottomNavigationAction
                                                    icon={<SparkIcon />}
                                                    label="Alerts"
                                                    value="alerts"
                                                />
                                            </BottomNavigation>

                                            <Pagination count={12} page={page + 1} />

                                            <Stack direction="row" spacing={scaleSpacing(1)}>
                                                <PaginationItem page={1} type="page" />
                                                <PaginationItem page={2} selected type="page" />
                                                <PaginationItem disabled type="next" />
                                            </Stack>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="Stepper, Step, StepButton, StepLabel, StepIcon, StepConnector, StepContent, MobileStepper"
                                        title="Steppers"
                                    >
                                        <Stack spacing={scaleSpacing(3)}>
                                            <Stepper
                                                activeStep={stepValue}
                                                alternativeLabel
                                                connector={<StepConnector />}
                                            >
                                                {['Intake', 'Validation', 'Dispatch'].map((label, index) => (
                                                    <Step key={label}>
                                                        <StepButton
                                                            onClick={() => {
                                                                setStepValue(index);
                                                            }}
                                                        >
                                                            <StepLabel StepIconComponent={StepIcon}>
                                                                {label}
                                                            </StepLabel>
                                                        </StepButton>
                                                    </Step>
                                                ))}
                                            </Stepper>

                                            <Stepper activeStep={1} orientation="vertical">
                                                <Step expanded>
                                                    <StepLabel>Manifest ingest</StepLabel>
                                                    <StepContent>
                                                        <Typography variant="body2" color="textSecondary">
                                                            Parse inbound files and reconcile them against the
                                                            booking list.
                                                        </Typography>
                                                    </StepContent>
                                                </Step>
                                                <Step expanded>
                                                    <StepLabel>Exception pass</StepLabel>
                                                    <StepContent>
                                                        <Typography variant="body2" color="textSecondary">
                                                            Capture blocked records for operator review.
                                                        </Typography>
                                                    </StepContent>
                                                </Step>
                                            </Stepper>

                                            <MobileStepper
                                                activeStep={1}
                                                backButton={<Button>Back</Button>}
                                                nextButton={<Button>Next</Button>}
                                                steps={4}
                                                variant="text"
                                            />
                                        </Stack>
                                    </DemoCard>
                                </Section>

                                <Section
                                    description="Containers, cards, accordions, grids, and other core composition primitives."
                                    id="layout"
                                    title="Layout and Surfaces"
                                >
                                    <DemoCard
                                        components="Accordion, AccordionSummary, AccordionDetails, AccordionActions"
                                        title="Accordion"
                                    >
                                        <Accordion defaultExpanded>
                                            <AccordionSummary expandIcon={<ChevronIcon />}>
                                                <Typography>Inbound exception queue</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body2" color="textSecondary">
                                                    Default accordion spacing leaves plenty of breathing room
                                                    around a fairly small amount of information.
                                                </Typography>
                                            </AccordionDetails>
                                            <AccordionActions>
                                                <Button>Ignore</Button>
                                                <Button>Review</Button>
                                            </AccordionActions>
                                        </Accordion>
                                    </DemoCard>

                                    <DemoCard
                                        components="Card, CardHeader, CardContent, CardActions, CardActionArea, CardMedia, Paper"
                                        title="Cards and papers"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <Card>
                                                <CardActionArea>
                                                    <CardMedia
                                                        alt="Operations preview"
                                                        component="img"
                                                        height="160"
                                                        image={IMAGE_TILES[1].src}
                                                    />
                                                    <CardHeader
                                                        subheader="Representative default card spacing"
                                                        title="Operations preview"
                                                    />
                                                    <CardContent>
                                                        <Typography variant="body2" color="textSecondary">
                                                            Cards are a useful baseline for evaluating whether
                                                            dense dashboards feel natural or forced inside
                                                            MUI’s component model.
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button>Open</Button>
                                                    <Button>Duplicate</Button>
                                                </CardActions>
                                            </Card>

                                            <Paper elevation={3}>
                                                <Box p={2}>
                                                    <Typography variant="subtitle2">Paper surface</Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        This shows the base elevated surface without
                                                        additional styling.
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="Container, Box, Grid, GridLegacy, Stack"
                                        title="Containers and grid systems"
                                    >
                                        <Stack spacing={scaleSpacing(3)}>
                                            <Container maxWidth="sm">
                                                <Paper variant="outlined">
                                                    <Box p={2}>
                                                        <Typography variant="subtitle2">
                                                            Container maxWidth=&quot;sm&quot;
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            Container adds centered responsive width
                                                            constraints.
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            </Container>

                                            <Grid container spacing={scaleSpacing(2)}>
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Paper variant="outlined">
                                                        <Box p={2}>
                                                            <Typography variant="subtitle2">Grid</Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Modern grid API using `size`.
                                                            </Typography>
                                                        </Box>
                                                    </Paper>
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Paper variant="outlined">
                                                        <Box p={2}>
                                                            <Typography variant="subtitle2">
                                                                Grid item
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Same default spacing and gutters.
                                                            </Typography>
                                                        </Box>
                                                    </Paper>
                                                </Grid>
                                            </Grid>

                                            <GridLegacy container spacing={scaleSpacing(2)}>
                                                <GridLegacy item sm={6} xs={12}>
                                                    <Paper variant="outlined">
                                                        <Box p={2}>
                                                            <Typography variant="subtitle2">
                                                                GridLegacy
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Deprecated API preserved here for comparison.
                                                            </Typography>
                                                        </Box>
                                                    </Paper>
                                                </GridLegacy>
                                                <GridLegacy item sm={6} xs={12}>
                                                    <Paper variant="outlined">
                                                        <Box p={2}>
                                                            <Typography variant="subtitle2">Stack</Typography>
                                                            <Stack spacing={scaleSpacing(1)}>
                                                                <Chip label="Row 1" />
                                                                <Chip label="Row 2" variant="outlined" />
                                                            </Stack>
                                                        </Box>
                                                    </Paper>
                                                </GridLegacy>
                                            </GridLegacy>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard components="ScopedCssBaseline" title="Scoped baseline">
                                        <ScopedCssBaseline>
                                            <Paper variant="outlined">
                                                <Box p={2}>
                                                    <Typography variant="subtitle2">
                                                        ScopedCssBaseline
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        This nested block applies MUI’s baseline reset only
                                                        within the subtree instead of across the whole
                                                        document.
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </ScopedCssBaseline>
                                    </DemoCard>
                                </Section>

                                <Section
                                    description="Dialogs, drawers, snackbars, transitions, and the components that portal into overlays."
                                    id="overlays"
                                    title="Overlays and Feedback"
                                >
                                    <DemoCard
                                        components="Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions"
                                        title="Dialog"
                                    >
                                        <Stack spacing={scaleSpacing(2)}>
                                            <Typography variant="body2" color="textSecondary">
                                                Open the dialog to inspect the default modal treatment.
                                            </Typography>
                                            <Button
                                                onClick={() => {
                                                    setDialogOpen(true);
                                                }}
                                                variant="outlined"
                                            >
                                                Open dialog
                                            </Button>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="Menu, MenuItem, Popover, Popper"
                                        title="Anchored overlays"
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={scaleSpacing(1.5)}
                                            useFlexGap
                                            flexWrap="wrap"
                                        >
                                            <Button onClick={handleMenuOpen} variant="outlined">
                                                Open menu
                                            </Button>
                                            <Button onClick={handlePopoverOpen} variant="outlined">
                                                Open popover
                                            </Button>
                                            <Button onClick={handlePopperOpen} variant="outlined">
                                                Toggle popper
                                            </Button>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard components="Drawer, SwipeableDrawer" title="Drawers">
                                        <Stack direction="row" spacing={scaleSpacing(1.5)}>
                                            <Button
                                                onClick={() => {
                                                    setDrawerOpen(true);
                                                }}
                                                variant="outlined"
                                            >
                                                Open drawer
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setSwipeableDrawerOpen(true);
                                                }}
                                                variant="outlined"
                                            >
                                                Open swipeable drawer
                                            </Button>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="Modal, Backdrop, Snackbar, SnackbarContent"
                                        title="Modal surfaces and transient feedback"
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={scaleSpacing(1.5)}
                                            useFlexGap
                                            flexWrap="wrap"
                                        >
                                            <Button
                                                onClick={() => {
                                                    setModalOpen(true);
                                                }}
                                                variant="outlined"
                                            >
                                                Open modal
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setBackdropOpen(true);
                                                }}
                                                variant="outlined"
                                            >
                                                Show backdrop
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setSnackbarOpen(true);
                                                }}
                                                variant="outlined"
                                            >
                                                Reopen snackbar
                                            </Button>
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard
                                        components="SpeedDial, SpeedDialAction, SpeedDialIcon"
                                        title="Speed dial"
                                    >
                                        <div className="mui-dense-speed-dial-shell">
                                            <SpeedDial
                                                ariaLabel="Dense gallery speed dial"
                                                icon={<SpeedDialIcon />}
                                                onClose={() => {
                                                    setSpeedDialOpen(false);
                                                }}
                                                onOpen={() => {
                                                    setSpeedDialOpen(true);
                                                }}
                                                open={speedDialOpen}
                                            >
                                                <SpeedDialAction icon={<RouteIcon />} tooltipTitle="Assign" />
                                                <SpeedDialAction
                                                    icon={<GridCellsIcon />}
                                                    tooltipTitle="Split"
                                                />
                                                <SpeedDialAction icon={<SparkIcon />} tooltipTitle="Flag" />
                                            </SpeedDial>
                                        </div>
                                    </DemoCard>

                                    <DemoCard components="Collapse, Fade, Grow, Slide" title="Transitions">
                                        <div className="mui-dense-transition-grid">
                                            <div className="mui-dense-transition-cell">
                                                <Collapse in>
                                                    <Paper variant="outlined">
                                                        <Box p={2}>
                                                            <Typography variant="body2">Collapse</Typography>
                                                        </Box>
                                                    </Paper>
                                                </Collapse>
                                            </div>
                                            <div className="mui-dense-transition-cell">
                                                <Fade in>
                                                    <Paper variant="outlined">
                                                        <Box p={2}>
                                                            <Typography variant="body2">Fade</Typography>
                                                        </Box>
                                                    </Paper>
                                                </Fade>
                                            </div>
                                            <div className="mui-dense-transition-cell">
                                                <Grow in>
                                                    <Paper variant="outlined">
                                                        <Box p={2}>
                                                            <Typography variant="body2">Grow</Typography>
                                                        </Box>
                                                    </Paper>
                                                </Grow>
                                            </div>
                                            <div className="mui-dense-transition-cell">
                                                <Slide direction="up" in>
                                                    <Paper variant="outlined">
                                                        <Box p={2}>
                                                            <Typography variant="body2">Slide</Typography>
                                                        </Box>
                                                    </Paper>
                                                </Slide>
                                            </div>
                                        </div>
                                    </DemoCard>
                                </Section>

                                <Section
                                    description="Browser-only rendering, portals, click-away handling, and focus management helpers."
                                    id="utilities"
                                    title="Utilities"
                                >
                                    <DemoCard
                                        components="ClickAwayListener, Portal, NoSsr, Unstable_TrapFocus"
                                        title="Utility helpers"
                                    >
                                        <Stack spacing={scaleSpacing(2.5)}>
                                            <ClickAwayListener
                                                onClickAway={() => {
                                                    setClickedAway(true);
                                                }}
                                            >
                                                <Paper variant="outlined">
                                                    <Box p={2}>
                                                        <Typography variant="subtitle2">
                                                            ClickAwayListener
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            Click outside this panel to update the status
                                                            below.
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            </ClickAwayListener>

                                            <Typography variant="body2" color="textSecondary">
                                                Status:{' '}
                                                {clickedAway
                                                    ? 'An outside click was detected.'
                                                    : 'No outside click yet.'}
                                            </Typography>

                                            <div
                                                className="mui-dense-portal-target"
                                                ref={node => {
                                                    if (node && portalTarget !== node) {
                                                        setPortalTarget(node);
                                                    }
                                                }}
                                            >
                                                <Typography variant="body2" color="textSecondary">
                                                    Portal target
                                                </Typography>
                                            </div>

                                            {portalTarget ? (
                                                <Portal container={() => portalTarget}>
                                                    <Chip color="primary" label="Rendered through Portal" />
                                                </Portal>
                                            ) : null}

                                            <NoSsr>
                                                <Chip
                                                    label={`NoSsr mounted in browser at ${new Date().toLocaleTimeString()}`}
                                                    variant="outlined"
                                                />
                                            </NoSsr>

                                            <Stack direction="row" spacing={scaleSpacing(1.5)}>
                                                <Button
                                                    onClick={() => {
                                                        setTrapFocusOpen(current => !current);
                                                    }}
                                                    variant="outlined"
                                                >
                                                    Toggle trap focus
                                                </Button>
                                            </Stack>

                                            {trapFocusOpen ? (
                                                <Unstable_TrapFocus open>
                                                    <Paper
                                                        className="mui-dense-trap-surface"
                                                        variant="outlined"
                                                    >
                                                        <Stack direction="row" spacing={scaleSpacing(1.5)}>
                                                            <Button>First focus stop</Button>
                                                            <Button>Second focus stop</Button>
                                                            <Button
                                                                onClick={() => {
                                                                    setTrapFocusOpen(false);
                                                                }}
                                                            >
                                                                Close
                                                            </Button>
                                                        </Stack>
                                                    </Paper>
                                                </Unstable_TrapFocus>
                                            ) : null}
                                        </Stack>
                                    </DemoCard>

                                    <DemoCard components="Zoom" title="Zoom">
                                        <Zoom in>
                                            <Paper variant="outlined">
                                                <Box p={2}>
                                                    <Typography variant="body2">
                                                        Zoom is shown separately so it does not fight the
                                                        other transitions for layout space.
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Zoom>
                                    </DemoCard>
                                </Section>
                            </div>
                        </main>
                    </div>
                </Container>

                <div aria-hidden="true" className="mui-dense-metrics">
                    <Typography component="span" ref={dataGridBody2ProbeRef} variant="body2">
                        Body2 probe
                    </Typography>
                    <Box
                        component="span"
                        ref={dataGridExProbeRef}
                        sx={{
                            ...densityTheme.typography.body2,
                            display: 'block',
                            height: '1ex',
                            width: 0,
                        }}
                    />
                </div>

                <Dialog
                    onClose={() => {
                        setDialogOpen(false);
                    }}
                    open={dialogOpen}
                >
                    <DialogTitle>Review lane discrepancy</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Default dialogs carry a lot of spacing and a clear modal frame, which makes them a
                            useful benchmark for later density experiments.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setDialogOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setDialogOpen(false);
                            }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                <Menu
                    anchorEl={menuAnchorEl}
                    onClose={() => {
                        setMenuAnchorEl(null);
                    }}
                    open={menuOpen}
                >
                    <MenuItem
                        onClick={() => {
                            setMenuAnchorEl(null);
                        }}
                    >
                        Assign owner
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setMenuAnchorEl(null);
                        }}
                    >
                        Split shipment
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setMenuAnchorEl(null);
                        }}
                    >
                        Export CSV
                    </MenuItem>
                </Menu>

                <Popover
                    anchorEl={popoverAnchorEl}
                    onClose={() => {
                        setPopoverAnchorEl(null);
                    }}
                    open={popoverOpen}
                >
                    <div className="mui-dense-overlay-content">
                        <Typography variant="subtitle2">Popover</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Default popovers use the same roomy surface language as menus and dialogs.
                        </Typography>
                    </div>
                </Popover>

                <Popper anchorEl={popperAnchorEl} open={popperOpen}>
                    <Paper className="mui-dense-overlay-content" variant="outlined">
                        <Typography variant="subtitle2">Popper</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Open and close this one repeatedly to compare the lightweight anchored behavior.
                        </Typography>
                    </Paper>
                </Popper>

                <Drawer
                    onClose={() => {
                        setDrawerOpen(false);
                    }}
                    open={drawerOpen}
                >
                    <div className="mui-dense-drawer-panel">
                        <Typography gutterBottom variant="h6">
                            Drawer
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemText primary="Overview" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemText primary="Queues" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemText primary="Exceptions" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>

                <SwipeableDrawer
                    onClose={() => {
                        setSwipeableDrawerOpen(false);
                    }}
                    onOpen={() => {
                        setSwipeableDrawerOpen(true);
                    }}
                    open={swipeableDrawerOpen}
                >
                    <div className="mui-dense-drawer-panel">
                        <Typography gutterBottom variant="h6">
                            Swipeable drawer
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Same drawer family, with touch-driven affordances layered in.
                        </Typography>
                    </div>
                </SwipeableDrawer>

                <Modal
                    onClose={() => {
                        setModalOpen(false);
                    }}
                    open={modalOpen}
                >
                    <Paper className="mui-dense-modal-surface">
                        <Typography gutterBottom variant="h6">
                            Modal
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            A lower-level modal surface without dialog framing or title actions.
                        </Typography>
                    </Paper>
                </Modal>

                <Backdrop
                    onClick={() => {
                        setBackdropOpen(false);
                    }}
                    open={backdropOpen}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Snackbar
                    autoHideDuration={6000}
                    message="Background poller connected"
                    onClose={() => {
                        setSnackbarOpen(false);
                    }}
                    open={snackbarOpen}
                />
            </div>
        </ThemeProvider>
    );
}
