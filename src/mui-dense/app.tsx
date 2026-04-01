import { type MouseEvent, type ReactNode, useState } from 'react';
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
    TabScrollButton,
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
import { DataGridPro, type GridColDef } from '@mui/x-data-grid-pro';
import { RichTreeView, SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { RichTreeViewPro, useRichTreeViewProApiRef } from '@mui/x-tree-view-pro';

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

const ROUTE_OPTIONS: RouteOption[] = [
    { label: 'NA eastbound', region: 'North America', density: 'Balanced' },
    { label: 'EU priority', region: 'Europe', density: 'Comfortable' },
    { label: 'APAC returns', region: 'Asia Pacific', density: 'Compact candidate' },
    { label: 'Cross-dock exceptions', region: 'Global', density: 'Dense candidate' },
];

const SHIPMENT_COLUMNS: GridColDef<ShipmentRow>[] = [
    { field: 'lane', headerName: 'Lane', flex: 1.2, minWidth: 160 },
    { field: 'stage', headerName: 'Stage', flex: 1, minWidth: 140 },
    { field: 'eta', headerName: 'ETA', flex: 0.8, minWidth: 120 },
    { field: 'owner', headerName: 'Owner', flex: 1, minWidth: 140 },
    { field: 'risk', headerName: 'Risk', flex: 0.7, minWidth: 110 },
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

export function App() {
    const proTreeApiRef = useRichTreeViewProApiRef<TreeDemoItem>();
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

    const menuOpen = Boolean(menuAnchorEl);
    const popoverOpen = Boolean(popoverAnchorEl);
    const popperOpen = Boolean(popperAnchorEl);

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
        <>
            <CssBaseline />

            <AppBar position="static">
                <Toolbar>
                    <div className="mui-dense-toolbar-layout">
                        <div>
                            <Typography variant="h6">MUI Dense Hodgepodge</Typography>
                            <Typography variant="body2">
                                Default-flavored MUI components for density evaluation.
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
                <Stack spacing={5}>
                    <div className="mui-dense-intro">
                        <div>
                            <Typography component="h1" gutterBottom variant="h3">
                                MUI Dense Hodgepodge
                            </Typography>
                            <Typography variant="body1">
                                This page gathers representative samples from `@mui/material`, DataGrid Pro,
                                and MUI X Tree View with their default styling intact, so it can serve as a
                                baseline before any density tuning.
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
                                <Stack spacing={2.5}>
                                    <TextField
                                        defaultValue="Consolidated freight monitor"
                                        helperText="Standard TextField"
                                        label="Dashboard title"
                                    />

                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="mui-dense-standard-input">
                                            Standard input
                                        </InputLabel>
                                        <Input
                                            defaultValue="route-group-alpha"
                                            id="mui-dense-standard-input"
                                        />
                                    </FormControl>

                                    <FormControl variant="filled">
                                        <InputLabel htmlFor="mui-dense-filled-input">Filled input</InputLabel>
                                        <FilledInput
                                            defaultValue="inbound exception queue"
                                            id="mui-dense-filled-input"
                                        />
                                    </FormControl>

                                    <FormControl variant="outlined">
                                        <InputLabel htmlFor="mui-dense-outlined-input">
                                            Outlined input
                                        </InputLabel>
                                        <OutlinedInput
                                            defaultValue="42 pallets"
                                            endAdornment={
                                                <InputAdornment position="end">units</InputAdornment>
                                            }
                                            id="mui-dense-outlined-input"
                                            label="Outlined input"
                                        />
                                    </FormControl>

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
                                components="Autocomplete, Select, NativeSelect, FormControl, FormLabel, FormHelperText"
                                title="Choice inputs"
                            >
                                <Stack spacing={2.5}>
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
                                        value={routeValue}
                                    />

                                    <FormControl>
                                        <InputLabel id="mui-dense-select-label">Density preset</InputLabel>
                                        <Select
                                            label="Density preset"
                                            labelId="mui-dense-select-label"
                                            onChange={event => {
                                                setDensityChoice(event.target.value);
                                            }}
                                            value={densityChoice}
                                        >
                                            <MenuItem value="comfortable">Comfortable</MenuItem>
                                            <MenuItem value="balanced">Balanced</MenuItem>
                                            <MenuItem value="compact">Compact candidate</MenuItem>
                                        </Select>
                                        <FormHelperText>Standard MUI select menu</FormHelperText>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel htmlFor="mui-dense-native-select">Native select</FormLabel>
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
                                <Stack spacing={2.5}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox defaultChecked />}
                                            label="Exception alerts"
                                        />
                                        <FormControlLabel control={<Checkbox />} label="Dock health" />
                                        <FormControlLabel
                                            control={<Checkbox defaultChecked />}
                                            label="Manifest validation"
                                        />
                                    </FormGroup>

                                    <FormControl>
                                        <FormLabel id="mui-dense-radio-group">Density direction</FormLabel>
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
                                <Stack spacing={2.5}>
                                    <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                                        <Button variant="contained">Primary action</Button>
                                        <Button variant="outlined">Secondary action</Button>
                                        <Button variant="text">Quiet action</Button>
                                    </Stack>

                                    <ButtonGroup aria-label="action group" variant="outlined">
                                        <Button>Review</Button>
                                        <Button>Assign</Button>
                                        <Button>Release</Button>
                                    </ButtonGroup>

                                    <Stack alignItems="center" direction="row" spacing={1.5}>
                                        <IconButton aria-label="Refresh route summary">
                                            <RouteIcon />
                                        </IconButton>
                                        <Fab color="primary" size="small">
                                            <SparkIcon />
                                        </Fab>
                                        <ButtonBase focusRipple>Plain ButtonBase</ButtonBase>
                                    </Stack>

                                    <Stack alignItems="center" direction="row" spacing={2}>
                                        <Icon>bolt</Icon>
                                        <SvgIcon>
                                            <path d="M5 4h14v4H5zm0 6h14v4H5zm0 6h14v4H5z" />
                                        </SvgIcon>
                                        <Typography variant="body2" color="textSecondary">
                                            `Icon` and `SvgIcon` are shown without a separate icon package.
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
                                <Stack spacing={2.5}>
                                    <Stack alignItems="center" direction="row" spacing={2}>
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

                                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                        <Chip color="primary" label="Live" />
                                        <Chip label="Pending audit" variant="outlined" />
                                        <Chip color="warning" label="Exception" variant="outlined" />
                                    </Stack>

                                    <Tooltip title="Tooltips remain interactive rather than always-open in the gallery">
                                        <Button variant="outlined">Hover for tooltip</Button>
                                    </Tooltip>

                                    <Divider />

                                    <Typography variant="subtitle1">Density baseline copy</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Material typography is intentionally roomy and calm. This baseline
                                        page is meant to make that feel tangible before trying to compress it.
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
                                <Stack spacing={2.5}>
                                    <List dense subheader={<ListSubheader>Exception queues</ListSubheader>}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>EX</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Customs review"
                                                secondary="12 stuck consignments"
                                            />
                                            <ListItemSecondaryAction>
                                                <Chip label="Escalated" size="small" />
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

                                    <MenuList dense>
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
                                <Stack spacing={2.5}>
                                    <ImageList cols={2} gap={12} rowHeight={120}>
                                        {IMAGE_TILES.map(tile => (
                                            <ImageListItem key={tile.title}>
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
                                <Stack spacing={2.5}>
                                    <Alert severity="warning">
                                        <AlertTitle>Review queued</AlertTitle>
                                        Lane ATL to LHR needs another pass before release.
                                    </Alert>

                                    <Stack direction="row" spacing={2}>
                                        <CircularProgress />
                                        <div>
                                            <LinearProgress />
                                        </div>
                                    </Stack>

                                    <Stack direction="row" spacing={2}>
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
                                <Stack spacing={3}>
                                    <TableContainer component={Paper} variant="outlined">
                                        <Table size="small">
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
                                                                Number.parseInt(event.target.value, 10),
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

                                    <div className="mui-dense-data-grid">
                                        <DataGridPro
                                            checkboxSelection
                                            columns={SHIPMENT_COLUMNS}
                                            disableRowSelectionOnClick
                                            label="Shipment lanes"
                                            pagination
                                            rows={SHIPMENT_ROWS}
                                            showToolbar
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
                                components="Breadcrumbs, Tabs, Tab, TabScrollButton"
                                title="Tabs and breadcrumb trails"
                            >
                                <Stack spacing={2.5}>
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
                                        value={tabValue}
                                        variant="scrollable"
                                    >
                                        <Tab label="Overview" />
                                        <Tab label="Queue detail" />
                                        <Tab label="Exceptions" />
                                        <Tab label="Audit trail" />
                                    </Tabs>

                                    <Stack direction="row" spacing={1}>
                                        <TabScrollButton direction="left" disabled orientation="horizontal" />
                                        <TabScrollButton direction="right" orientation="horizontal" />
                                    </Stack>
                                </Stack>
                            </DemoCard>

                            <DemoCard
                                components="@mui/x-tree-view: SimpleTreeView, RichTreeView, TreeItem; @mui/x-tree-view-pro: RichTreeViewPro"
                                title="Tree views"
                                wide
                            >
                                <Stack spacing={2.5}>
                                    <Typography variant="body2" color="textSecondary">
                                        The community package covers the basic and item-driven trees. The Pro
                                        sample below uses the same license key path as DataGrid Pro and
                                        enables item reordering.
                                    </Typography>

                                    <div className="mui-dense-tree-gallery">
                                        <Paper className="mui-dense-tree-panel" variant="outlined">
                                            <Box p={2}>
                                                <Stack spacing={1.5}>
                                                    <div>
                                                        <Typography variant="subtitle2">
                                                            SimpleTreeView
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            Hard-coded JSX tree.
                                                        </Typography>
                                                    </div>

                                                    <SimpleTreeView
                                                        aria-label="Simple control-room tree"
                                                        defaultExpandedItems={[
                                                            'simple-control-room',
                                                            'simple-floor-ops',
                                                        ]}
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
                                                            <TreeItem itemId="simple-intake" label="Intake" />
                                                            <TreeItem itemId="simple-sort" label="Sort" />
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
                                                <Stack spacing={1.5}>
                                                    <div>
                                                        <Typography variant="subtitle2">
                                                            RichTreeView
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            Community item-driven tree using the `items` prop.
                                                        </Typography>
                                                    </div>

                                                    <RichTreeView
                                                        aria-label="Rich workstation tree"
                                                        defaultExpandedItems={[
                                                            'rich-workstation',
                                                            'rich-overview',
                                                        ]}
                                                        items={COMMUNITY_RICH_TREE_ITEMS}
                                                    />
                                                </Stack>
                                            </Box>
                                        </Paper>

                                        <Paper className="mui-dense-tree-panel" variant="outlined">
                                            <Box p={2}>
                                                <Stack spacing={1.5}>
                                                    <div>
                                                        <Typography variant="subtitle2">
                                                            RichTreeViewPro
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
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

                                                    <Typography variant="caption" color="textSecondary">
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
                                <Stack spacing={2.5}>
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

                                    <Stack direction="row" spacing={1}>
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
                                <Stack spacing={3}>
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
                                                    Parse inbound files and reconcile them against the booking
                                                    list.
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
                                        backButton={<Button size="small">Back</Button>}
                                        nextButton={<Button size="small">Next</Button>}
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
                                            Default accordion spacing leaves plenty of breathing room around a
                                            fairly small amount of information.
                                        </Typography>
                                    </AccordionDetails>
                                    <AccordionActions>
                                        <Button size="small">Ignore</Button>
                                        <Button size="small">Review</Button>
                                    </AccordionActions>
                                </Accordion>
                            </DemoCard>

                            <DemoCard
                                components="Card, CardHeader, CardContent, CardActions, CardActionArea, CardMedia, Paper"
                                title="Cards and papers"
                            >
                                <Stack spacing={2.5}>
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
                                                    Cards are a useful baseline for evaluating whether dense
                                                    dashboards feel natural or forced inside MUI’s component
                                                    model.
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small">Open</Button>
                                            <Button size="small">Duplicate</Button>
                                        </CardActions>
                                    </Card>

                                    <Paper elevation={3}>
                                        <Box p={2}>
                                            <Typography variant="subtitle2">Paper surface</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                This shows the base elevated surface without additional
                                                styling.
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Stack>
                            </DemoCard>

                            <DemoCard
                                components="Container, Box, Grid, GridLegacy, Stack"
                                title="Containers and grid systems"
                            >
                                <Stack spacing={3}>
                                    <Container maxWidth="sm">
                                        <Paper variant="outlined">
                                            <Box p={2}>
                                                <Typography variant="subtitle2">
                                                    Container maxWidth=&quot;sm&quot;
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Container adds centered responsive width constraints.
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Container>

                                    <Grid container spacing={2}>
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
                                                    <Typography variant="subtitle2">Grid item</Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Same default spacing and gutters.
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                    <GridLegacy container spacing={2}>
                                        <GridLegacy item sm={6} xs={12}>
                                            <Paper variant="outlined">
                                                <Box p={2}>
                                                    <Typography variant="subtitle2">GridLegacy</Typography>
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
                                                    <Stack spacing={1}>
                                                        <Chip label="Row 1" size="small" />
                                                        <Chip label="Row 2" size="small" variant="outlined" />
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
                                            <Typography variant="subtitle2">ScopedCssBaseline</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                This nested block applies MUI’s baseline reset only within the
                                                subtree instead of across the whole document.
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
                                <Stack spacing={2}>
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

                            <DemoCard components="Menu, MenuItem, Popover, Popper" title="Anchored overlays">
                                <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
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
                                <Stack direction="row" spacing={1.5}>
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
                                <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
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
                                        <SpeedDialAction icon={<GridCellsIcon />} tooltipTitle="Split" />
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
                                <Stack spacing={2.5}>
                                    <ClickAwayListener
                                        onClickAway={() => {
                                            setClickedAway(true);
                                        }}
                                    >
                                        <Paper variant="outlined">
                                            <Box p={2}>
                                                <Typography variant="subtitle2">ClickAwayListener</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Click outside this panel to update the status below.
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

                                    <Stack direction="row" spacing={1.5}>
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
                                            <Paper className="mui-dense-trap-surface" variant="outlined">
                                                <Stack direction="row" spacing={1.5}>
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
                                                Zoom is shown separately so it does not fight the other
                                                transitions for layout space.
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Zoom>
                            </DemoCard>
                        </Section>
                    </div>
                </Stack>
            </Container>

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
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Overview" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Queues" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
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
        </>
    );
}
