import { type MouseEvent, useState } from 'react';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Alert,
    AlertTitle,
    Autocomplete,
    AppBar,
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
import { RichTreeView, SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { RichTreeViewPro, useRichTreeViewProApiRef } from '@mui/x-tree-view-pro';

import { DenseDataGrid, type DenseDataGridMetrics, type DenseSettings } from './lib';
import {
    BeaconIcon,
    ChevronIcon,
    COMPACT_TAB_SX,
    COMMUNITY_RICH_TREE_ITEMS,
    GridCellsIcon,
    IMAGE_TILES,
    PRO_TREE_ITEMS,
    ROUTE_OPTIONS,
    RouteIcon,
    SHIPMENT_COLUMNS,
    SHIPMENT_ROWS,
    SparkIcon,
    type RouteOption,
    type TreeDemoItem,
} from './gallery-data';
import type { GalleryDenseControls } from './gallery-dense';
import { DemoCard, Section } from './gallery-shell';
import { muiXLicenseConfigured } from './license';

type GalleryWorkspaceProps = {
    dense: DenseSettings;
    onDataGridMetricsChange: (metrics: DenseDataGridMetrics) => void;
    uiControls: GalleryDenseControls;
};

const COMPACT_DEMO_MAX_WIDTH = 395;
const UTILITY_DEMO_MAX_WIDTH = COMPACT_DEMO_MAX_WIDTH;
const TABLE_DEMO_MAX_WIDTH = 667;
const DATA_GRID_DEMO_MAX_WIDTH = 1111;
const NAVIGATION_CHROME_MAX_WIDTH = 1000;

export function GalleryWorkspace({ dense, onDataGridMetricsChange, uiControls }: GalleryWorkspaceProps) {
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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const [clickedAway, setClickedAway] = useState(false);
    const [trapFocusOpen, setTrapFocusOpen] = useState(false);
    const [transitionsVisible, setTransitionsVisible] = useState(true);
    const [zoomVisible, setZoomVisible] = useState(true);
    const [portalTarget, setPortalTarget] = useState<HTMLDivElement | null>(null);
    const [proTreeItems, setProTreeItems] = useState<TreeDemoItem[]>(PRO_TREE_ITEMS);
    const [treeMoveSummary, setTreeMoveSummary] = useState('Drag items in the Pro tree to reorder them.');
    const [statusSpinnerAnimating, setStatusSpinnerAnimating] = useState(false);
    const menuOpen = Boolean(menuAnchorEl);
    const popoverOpen = Boolean(popoverAnchorEl);
    const popperOpen = Boolean(popperAnchorEl);
    const scaleSpacing = (value: number) =>
        Math.max(0.5, Number((value * uiControls.layoutScale).toFixed(2)));

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
            <main className="mui-dense-main">
                <div className="mui-dense-intro">
                    <div>
                        <Typography component="h1" gutterBottom variant="h3">
                            MUI Dense
                        </Typography>
                        <Typography variant="body1">
                            Gallery of MUI components for experimenting with look-and-feel controls.
                        </Typography>
                    </div>

                    <Alert severity={muiXLicenseConfigured ? 'success' : 'info'}>
                        <AlertTitle>MUI X Pro license</AlertTitle>
                        {muiXLicenseConfigured
                            ? 'Loaded from VITE_MUI_X_LICENSE_KEY for this session.'
                            : 'Set VITE_MUI_X_LICENSE_KEY in your shell or .env.local to supply a local license key for DataGrid Pro and Tree View Pro without committing it.'}
                    </Alert>
                </div>

                <div className="mui-dense-sections">
                    <Section
                        description="Form controls, typed entry, and the main action surfaces."
                        id="inputs"
                        title="Inputs"
                    >
                        <DemoCard
                            components="Checkbox, FormGroup, FormControlLabel, Radio, RadioGroup, Switch, Slider, Rating, ToggleButton, ToggleButtonGroup"
                            title="Selection controls"
                        >
                            <Stack spacing={scaleSpacing(2.5)}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked size="small" sx={{ py: 0.5 }} />}
                                        label="Exception alerts"
                                        sx={{ mr: 0 }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size="small" sx={{ py: 0.5 }} />}
                                        label="Dock health"
                                        sx={{ mr: 0 }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked size="small" sx={{ py: 0.5 }} />}
                                        label="Manifest validation"
                                        sx={{ mr: 0 }}
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
                            components="TextField, Input, FilledInput, OutlinedInput, InputAdornment, InputBase, TextareaAutosize"
                            title="Text entry"
                        >
                            <Stack spacing={scaleSpacing(2.5)}>
                                <TextField
                                    defaultValue="Consolidated freight monitor"
                                    helperText="Standard TextField"
                                    label="Dashboard title"
                                />

                                <FormControl size={uiControls.componentSize} variant="standard">
                                    <InputLabel htmlFor="mui-dense-standard-input">Standard input</InputLabel>
                                    <Input defaultValue="route-group-alpha" id="mui-dense-standard-input" />
                                </FormControl>

                                <FormControl size={uiControls.componentSize} variant="filled">
                                    <InputLabel htmlFor="mui-dense-filled-input">Filled input</InputLabel>
                                    <FilledInput
                                        defaultValue="inbound exception queue"
                                        id="mui-dense-filled-input"
                                    />
                                </FormControl>

                                <Box sx={dense.compactInputs ? { pt: 1 } : undefined}>
                                    <FormControl size={uiControls.componentSize} variant="outlined">
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
                                    style={{
                                        boxSizing: 'border-box',
                                        maxWidth: '100%',
                                        resize: 'vertical',
                                        width: '100%',
                                    }}
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

                                <FormControl size={uiControls.componentSize}>
                                    <InputLabel id="mui-dense-select-label">Density preset</InputLabel>
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

                                <FormControl size={uiControls.componentSize} variant="standard">
                                    <InputLabel htmlFor="mui-dense-native-select">Native select</InputLabel>
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
                            components="Button, ButtonGroup, ButtonBase, IconButton, Fab, Icon, SvgIcon"
                            title="Action surfaces"
                        >
                            <Stack spacing={scaleSpacing(2.5)}>
                                <Stack direction="row" spacing={scaleSpacing(1.5)} useFlexGap flexWrap="wrap">
                                    <Button data-testid="mui-dense-compact-button" variant="contained">
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

                                <Stack alignItems="center" direction="row" spacing={scaleSpacing(1.5)}>
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

                                <Stack alignItems="center" direction="row" spacing={scaleSpacing(2)}>
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
                                        `Icon` uses a plain glyph here because the Material icon font is not
                                        bundled. `SvgIcon` renders a custom inline SVG.
                                    </Typography>
                                </Stack>
                            </Stack>
                        </DemoCard>
                    </Section>

                    <Section
                        description="Lists, imagery, status indicators, and other compact display components."
                        id="data-display"
                        title="Data Display"
                    >
                        <DemoCard
                            components="ImageList, ImageListItem, ImageListItemBar, CardMedia"
                            title="Images"
                        >
                            <Stack spacing={scaleSpacing(2.5)}>
                                <ImageList
                                    cols={2}
                                    gap={uiControls.imageGap}
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
                                            <ImageListItemBar subtitle={tile.subtitle} title={tile.title} />
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
                                    <Stack spacing={scaleSpacing(1.5)}>
                                        <Button
                                            onClick={() => {
                                                setStatusSpinnerAnimating(current => !current);
                                            }}
                                            variant="outlined"
                                        >
                                            {statusSpinnerAnimating ? 'Hide spinner' : 'Show spinner'}
                                        </Button>

                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                height: 40,
                                                justifyContent: 'center',
                                                width: 40,
                                            }}
                                        >
                                            {statusSpinnerAnimating ? <CircularProgress /> : null}
                                        </Box>
                                    </Stack>
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
                            components="Avatar, AvatarGroup, Badge, Chip, Tooltip"
                            title="Identity, badges, and chips"
                        >
                            <Stack spacing={scaleSpacing(2.5)}>
                                <Stack alignItems="center" direction="row" spacing={scaleSpacing(2)}>
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

                                <Stack direction="row" spacing={scaleSpacing(1)} useFlexGap flexWrap="wrap">
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
                            </Stack>
                        </DemoCard>
                    </Section>

                    <Section
                        description="Vanilla table primitives and DataGridPro, separated so each can use a more realistic width."
                        id="tables"
                        title="Tables"
                    >
                        <DemoCard
                            components="DataGridPro"
                            maxWidth={DATA_GRID_DEMO_MAX_WIDTH}
                            title="DataGridPro"
                        >
                            <div className="mui-dense-data-grid">
                                <DenseDataGrid
                                    dense={dense.dataGrid}
                                    onMetricsChange={onDataGridMetricsChange}
                                    checkboxSelection
                                    columns={SHIPMENT_COLUMNS}
                                    disableRowSelectionOnClick
                                    headerFilters={uiControls.dataGridHeaderFilters}
                                    label="Shipment lanes"
                                    pagination
                                    rows={SHIPMENT_ROWS}
                                    showToolbar
                                />
                            </div>
                        </DemoCard>

                        <DemoCard
                            components="Table, TableContainer, TableHead, TableBody, TableFooter, TableRow, TableCell, TableSortLabel, TablePagination, TablePaginationActions"
                            maxWidth={TABLE_DEMO_MAX_WIDTH}
                            title="Table"
                        >
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
                                                    setRowsPerPage(Number.parseInt(event.target.value, 10));
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
                        </DemoCard>
                    </Section>

                    <Section
                        description="Community and Pro tree view variants, separated so the three tree demos stay directly comparable."
                        id="trees"
                        title="Trees"
                    >
                        <DemoCard
                            components="@mui/x-tree-view-pro: RichTreeViewPro"
                            maxWidth={COMPACT_DEMO_MAX_WIDTH}
                            title="RichTreeViewPro"
                        >
                            <Stack spacing={scaleSpacing(2.5)}>
                                <Typography variant="body2" color="textSecondary">
                                    Pro tree using the same license path as DataGridPro, with item reordering
                                    enabled.
                                </Typography>

                                <RichTreeViewPro
                                    apiRef={proTreeApiRef}
                                    aria-label="Pro control-room tree"
                                    defaultExpandedItems={['pro-control-room', 'pro-floor']}
                                    itemChildrenIndentation={uiControls.treeIndentation}
                                    items={proTreeItems}
                                    itemsReordering
                                    onItemPositionChange={({ itemId, oldPosition, newPosition }) => {
                                        const nextItems = proTreeApiRef.current?.getItemTree?.();

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
                        </DemoCard>

                        <DemoCard
                            components="@mui/x-tree-view: RichTreeView"
                            maxWidth={COMPACT_DEMO_MAX_WIDTH}
                            title="RichTreeView"
                        >
                            <Stack spacing={scaleSpacing(2.5)}>
                                <Typography variant="body2" color="textSecondary">
                                    Community item-driven tree using the `items` prop.
                                </Typography>

                                <RichTreeView
                                    aria-label="Rich workstation tree"
                                    defaultExpandedItems={[
                                        'rich-workstation',
                                        'rich-overview',
                                        'rich-analytics',
                                    ]}
                                    itemChildrenIndentation={uiControls.treeIndentation}
                                    items={COMMUNITY_RICH_TREE_ITEMS}
                                />
                            </Stack>
                        </DemoCard>

                        <DemoCard
                            components="@mui/x-tree-view: SimpleTreeView, TreeItem"
                            maxWidth={COMPACT_DEMO_MAX_WIDTH}
                            title="SimpleTreeView"
                        >
                            <Stack spacing={scaleSpacing(2.5)}>
                                <Typography variant="body2" color="textSecondary">
                                    Hard-coded JSX tree from the community package.
                                </Typography>

                                <SimpleTreeView
                                    aria-label="Simple control-room tree"
                                    defaultExpandedItems={['simple-control-room', 'simple-floor-ops']}
                                    itemChildrenIndentation={uiControls.treeIndentation}
                                >
                                    <TreeItem itemId="simple-control-room" label="Control room">
                                        <TreeItem itemId="simple-wallboard" label="Wallboard" />
                                        <TreeItem itemId="simple-alert-desk" label="Alert desk" />
                                    </TreeItem>
                                    <TreeItem itemId="simple-floor-ops" label="Floor operations">
                                        <TreeItem itemId="simple-intake" label="Intake" />
                                        <TreeItem itemId="simple-sort" label="Sort" />
                                        <TreeItem itemId="simple-release" label="Release" />
                                    </TreeItem>
                                </SimpleTreeView>
                            </Stack>
                        </DemoCard>
                    </Section>

                    <Section
                        description="Tabs, stepper flows, navigation bars, paging, and breadcrumb structures."
                        id="navigation"
                        title="Navigation"
                    >
                        <DemoCard
                            components="Stepper, Step, StepButton, StepLabel, StepIcon, StepConnector, StepContent"
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
                                                <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
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
                            components="AppBar, Toolbar, MobileStepper"
                            maxWidth={NAVIGATION_CHROME_MAX_WIDTH}
                            title="App bar and mobile stepper"
                        >
                            <Stack spacing={scaleSpacing(2.5)}>
                                <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
                                    <AppBar position="static">
                                        <Toolbar>
                                            <div className="mui-dense-toolbar-layout">
                                                <div>
                                                    <Typography variant="h6">Ops workstation</Typography>
                                                    <Typography variant="body2">
                                                        Representative app-level toolbar chrome.
                                                    </Typography>
                                                </div>

                                                <div className="mui-dense-toolbar-links">
                                                    <Button color="inherit">Overview</Button>
                                                    <Button color="inherit">Exceptions</Button>
                                                    <Button color="inherit">Settings</Button>
                                                </div>
                                            </div>
                                        </Toolbar>
                                    </AppBar>
                                </Paper>

                                <Paper variant="outlined">
                                    <MobileStepper
                                        activeStep={1}
                                        backButton={<Button>Back</Button>}
                                        nextButton={<Button>Next</Button>}
                                        position="static"
                                        steps={4}
                                        variant="text"
                                    />
                                </Paper>
                            </Stack>
                        </DemoCard>

                        <DemoCard components="Breadcrumbs, Tabs, Tab" title="Tabs and breadcrumb trails">
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
                    </Section>

                    <Section
                        description="Containers, cards, accordions, grids, and other core composition primitives."
                        id="layout"
                        title="Layout and Surfaces"
                    >
                        <DemoCard
                            components="Card, CardHeader, CardContent, CardActions, CardActionArea, CardMedia, Paper"
                            fixedWidth={COMPACT_DEMO_MAX_WIDTH}
                            maxWidth={COMPACT_DEMO_MAX_WIDTH}
                            minWidth={COMPACT_DEMO_MAX_WIDTH}
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
                                                Cards are a useful baseline for evaluating whether dense
                                                dashboards feel natural or forced inside MUI’s component
                                                model.
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
                                            This shows the base elevated surface without additional styling.
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
                                                Container adds centered responsive width constraints.
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
                                                <Typography variant="subtitle2">Grid item</Typography>
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
                                    <Button>Ignore</Button>
                                    <Button>Review</Button>
                                </AccordionActions>
                            </Accordion>
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
                            components="SpeedDial, SpeedDialAction, SpeedDialIcon"
                            fixedWidth={COMPACT_DEMO_MAX_WIDTH}
                            maxWidth={COMPACT_DEMO_MAX_WIDTH}
                            minWidth={COMPACT_DEMO_MAX_WIDTH}
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

                        <DemoCard
                            components="Collapse, Fade, Grow, Slide"
                            fixedWidth={COMPACT_DEMO_MAX_WIDTH}
                            maxWidth={COMPACT_DEMO_MAX_WIDTH}
                            minWidth={COMPACT_DEMO_MAX_WIDTH}
                            title="Transitions"
                        >
                            <Stack spacing={scaleSpacing(2)}>
                                <Stack direction="row" spacing={scaleSpacing(1.5)} useFlexGap flexWrap="wrap">
                                    <Button
                                        onClick={() => {
                                            setTransitionsVisible(current => !current);
                                        }}
                                        variant="outlined"
                                    >
                                        {transitionsVisible ? 'Hide elements' : 'Show elements'}
                                    </Button>
                                    <Typography color="textSecondary" variant="body2">
                                        These components animate only on enter and exit.
                                    </Typography>
                                </Stack>

                                <div className="mui-dense-transition-grid">
                                    <div className="mui-dense-transition-cell">
                                        <Collapse in={transitionsVisible}>
                                            <Paper variant="outlined">
                                                <Box p={2}>
                                                    <Typography variant="body2">Collapse</Typography>
                                                </Box>
                                            </Paper>
                                        </Collapse>
                                    </div>
                                    <div className="mui-dense-transition-cell">
                                        <Fade in={transitionsVisible}>
                                            <Paper variant="outlined">
                                                <Box p={2}>
                                                    <Typography variant="body2">Fade</Typography>
                                                </Box>
                                            </Paper>
                                        </Fade>
                                    </div>
                                    <div className="mui-dense-transition-cell">
                                        <Grow in={transitionsVisible}>
                                            <Paper variant="outlined">
                                                <Box p={2}>
                                                    <Typography variant="body2">Grow</Typography>
                                                </Box>
                                            </Paper>
                                        </Grow>
                                    </div>
                                    <div className="mui-dense-transition-cell">
                                        <Slide direction="up" in={transitionsVisible}>
                                            <Paper variant="outlined">
                                                <Box p={2}>
                                                    <Typography variant="body2">Slide</Typography>
                                                </Box>
                                            </Paper>
                                        </Slide>
                                    </div>
                                </div>
                            </Stack>
                        </DemoCard>

                        <DemoCard maxWidth={COMPACT_DEMO_MAX_WIDTH} title="Zoom transition">
                            <Stack spacing={scaleSpacing(2)}>
                                <Typography color="textSecondary" variant="body2">
                                    Zoom is shown separately so it does not fight the other transitions for
                                    layout space.
                                </Typography>
                                <Stack direction="row" spacing={scaleSpacing(1.5)} useFlexGap flexWrap="wrap">
                                    <Button
                                        onClick={() => {
                                            setZoomVisible(current => !current);
                                        }}
                                        variant="outlined"
                                    >
                                        {zoomVisible ? 'Hide element' : 'Show element'}
                                    </Button>
                                </Stack>
                                <Zoom in={zoomVisible}>
                                    <Paper variant="outlined">
                                        <Box p={2}>
                                            <Typography variant="body2">Zoom</Typography>
                                        </Box>
                                    </Paper>
                                </Zoom>
                            </Stack>
                        </DemoCard>

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
                            components="Modal, Backdrop, Snackbar, SnackbarContent"
                            title="Modal surfaces and transient feedback"
                        >
                            <Stack direction="row" spacing={scaleSpacing(1.5)} useFlexGap flexWrap="wrap">
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
                                    Open snackbar
                                </Button>
                            </Stack>
                        </DemoCard>

                        <DemoCard components="Menu, MenuItem, Popover, Popper" title="Anchored overlays">
                            <Stack direction="row" spacing={scaleSpacing(1.5)} useFlexGap flexWrap="wrap">
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
                    </Section>

                    <Section
                        description="Browser-only rendering, portals, click-away handling, and focus management helpers."
                        id="utilities"
                        title="Utilities"
                    >
                        <DemoCard
                            components="ClickAwayListener, Portal, NoSsr, Unstable_TrapFocus"
                            maxWidth={UTILITY_DEMO_MAX_WIDTH}
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
                                            <Typography variant="subtitle2">ClickAwayListener</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Click outside this panel to update the status below.
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </ClickAwayListener>

                                <Typography variant="body2" color="textSecondary">
                                    Status:{' '}
                                    {clickedAway ? 'An outside click was detected.' : 'No outside click yet.'}
                                </Typography>

                                <Typography variant="body2" color="textSecondary">
                                    Portal renders a child into a different DOM container. The chip below is
                                    declared here but mounted inside the dashed target box.
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
                                        <Chip color="primary" label="Mounted through Portal" />
                                    </Portal>
                                ) : null}

                                <Stack spacing={scaleSpacing(1)}>
                                    <Typography variant="body2" color="textSecondary">
                                        NoSsr skips server-side rendering and only mounts its children in the
                                        browser.
                                    </Typography>

                                    <NoSsr>
                                        <Chip
                                            label={`Browser-only child mounted at ${new Date().toLocaleTimeString()}`}
                                            variant="outlined"
                                        />
                                    </NoSsr>
                                </Stack>

                                <Stack spacing={scaleSpacing(1)}>
                                    <Typography variant="body2" color="textSecondary">
                                        TrapFocus keeps keyboard focus inside the small region below while it
                                        is open.
                                    </Typography>

                                    <Stack direction="row" spacing={scaleSpacing(1.5)}>
                                        <Button
                                            onClick={() => {
                                                setTrapFocusOpen(current => !current);
                                            }}
                                            variant="outlined"
                                        >
                                            {trapFocusOpen
                                                ? 'Close trapped-focus region'
                                                : 'Open trapped-focus region'}
                                        </Button>
                                    </Stack>
                                </Stack>

                                {trapFocusOpen ? (
                                    <Unstable_TrapFocus open>
                                        <Paper className="mui-dense-trap-surface" variant="outlined">
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
                    </Section>
                </div>
            </main>

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
        </>
    );
}
