import { Box, SvgIcon } from '@mui/material';
import {
    type GridColDef,
    type GridColumnHeaderParams,
    type GridRenderCellParams,
} from '@mui/x-data-grid-pro';

export type RouteOption = {
    label: string;
    region: string;
    density: string;
};

export type ShipmentRow = {
    id: number;
    lane: string;
    stage: string;
    eta: string;
    owner: string;
    risk: 'Low' | 'Medium' | 'High';
};

export type TreeDemoItem = {
    id: string;
    label: string;
    children?: TreeDemoItem[];
};

export const ROUTE_OPTIONS: RouteOption[] = [
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

export const SHIPMENT_COLUMNS: GridColDef<ShipmentRow>[] = [
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

export const SHIPMENT_ROWS: ShipmentRow[] = [
    { id: 1, lane: 'ATL to LHR', stage: 'Manifest audit', eta: '08:40', owner: 'M. Wu', risk: 'Low' },
    { id: 2, lane: 'JFK to AMS', stage: 'Gate hold', eta: '09:15', owner: 'L. Patel', risk: 'High' },
    { id: 3, lane: 'SFO to NRT', stage: 'Booked', eta: '11:05', owner: 'R. Gomez', risk: 'Low' },
    { id: 4, lane: 'ORD to GRU', stage: 'Security review', eta: '13:20', owner: 'A. Tran', risk: 'Medium' },
    { id: 5, lane: 'SEA to SYD', stage: 'Transfer', eta: '14:35', owner: 'J. Kim', risk: 'Medium' },
    { id: 6, lane: 'MIA to MAD', stage: 'Released', eta: '16:10', owner: 'D. Singh', risk: 'Low' },
];

export const COMMUNITY_RICH_TREE_ITEMS: TreeDemoItem[] = [
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

export const PRO_TREE_ITEMS: TreeDemoItem[] = [
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

export const IMAGE_TILES = [
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

export const COMPACT_TAB_SX = {
    minHeight: 40,
    minWidth: 0,
    px: 1.5,
    py: 0.75,
} as const;

export function ChevronIcon() {
    return (
        <SvgIcon fontSize="small">
            <path d="M7 10l5 5 5-5z" />
        </SvgIcon>
    );
}

export function SparkIcon() {
    return (
        <SvgIcon fontSize="small">
            <path d="M12 2l2.3 5.2L20 9l-5.7 1.8L12 16l-2.3-5.2L4 9l5.7-1.8z" />
        </SvgIcon>
    );
}

export function RouteIcon() {
    return (
        <SvgIcon fontSize="small">
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="18" cy="18" r="3" />
            <path d="M8.5 11l6-3M8.5 13l6 3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </SvgIcon>
    );
}

export function GridCellsIcon() {
    return (
        <SvgIcon fontSize="small">
            <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" />
        </SvgIcon>
    );
}

export function BeaconIcon() {
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
