import {
    Button,
    Cell,
    Column,
    Row,
    Table,
    TableBody,
    TableHeader,
    Tree,
    TreeItem,
    TreeItemContent,
} from 'react-aria-components';

type Airport = {
    id: string;
    name: string;
    abbreviation: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    elevationFeet: number;
    hasRailLink: boolean;
};

type VehicleNode = {
    id: string;
    label: string;
    children?: VehicleNode[];
};

const AIRPORTS: Airport[] = [
    {
        id: 'atl',
        name: 'Hartsfield-Jackson Atlanta International Airport',
        abbreviation: 'ATL',
        city: 'Atlanta',
        country: 'United States',
        latitude: 33.6407,
        longitude: -84.4277,
        elevationFeet: 1026,
        hasRailLink: true,
    },
    {
        id: 'lhr',
        name: 'Heathrow Airport',
        abbreviation: 'LHR',
        city: 'London',
        country: 'United Kingdom',
        latitude: 51.47,
        longitude: -0.4543,
        elevationFeet: 83,
        hasRailLink: true,
    },
    {
        id: 'hnd',
        name: 'Tokyo Haneda Airport',
        abbreviation: 'HND',
        city: 'Tokyo',
        country: 'Japan',
        latitude: 35.5494,
        longitude: 139.7798,
        elevationFeet: 21,
        hasRailLink: true,
    },
    {
        id: 'dxb',
        name: 'Dubai International Airport',
        abbreviation: 'DXB',
        city: 'Dubai',
        country: 'United Arab Emirates',
        latitude: 25.2532,
        longitude: 55.3657,
        elevationFeet: 62,
        hasRailLink: true,
    },
    {
        id: 'gru',
        name: 'Sao Paulo-Guarulhos International Airport',
        abbreviation: 'GRU',
        city: 'Sao Paulo',
        country: 'Brazil',
        latitude: -23.4356,
        longitude: -46.4731,
        elevationFeet: 2459,
        hasRailLink: false,
    },
    {
        id: 'syd',
        name: 'Sydney Airport',
        abbreviation: 'SYD',
        city: 'Sydney',
        country: 'Australia',
        latitude: -33.9399,
        longitude: 151.1753,
        elevationFeet: 21,
        hasRailLink: true,
    },
];

const VEHICLES: VehicleNode[] = [
    {
        id: 'toyota',
        label: 'Toyota',
        children: [
            {
                id: 'toyota-camry',
                label: 'Camry',
                children: [
                    {
                        id: 'toyota-camry-le',
                        label: 'LE',
                        children: [
                            { id: 'toyota-camry-le-2024', label: '2024 hybrid sedan' },
                            { id: 'toyota-camry-le-2025', label: '2025 hybrid sedan' },
                        ],
                    },
                    {
                        id: 'toyota-camry-xse',
                        label: 'XSE',
                        children: [
                            { id: 'toyota-camry-xse-2024', label: '2024 AWD sedan' },
                            { id: 'toyota-camry-xse-2025', label: '2025 AWD sedan' },
                        ],
                    },
                ],
            },
            {
                id: 'toyota-rav4',
                label: 'RAV4',
                children: [
                    {
                        id: 'toyota-rav4-xle',
                        label: 'XLE',
                        children: [
                            { id: 'toyota-rav4-xle-2024', label: '2024 gas crossover' },
                            { id: 'toyota-rav4-xle-2025', label: '2025 hybrid crossover' },
                        ],
                    },
                    {
                        id: 'toyota-rav4-limited',
                        label: 'Limited',
                        children: [
                            { id: 'toyota-rav4-limited-2024', label: '2024 AWD hybrid' },
                            { id: 'toyota-rav4-limited-2025', label: '2025 AWD hybrid' },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'ford',
        label: 'Ford',
        children: [
            {
                id: 'ford-f150',
                label: 'F-150',
                children: [
                    {
                        id: 'ford-f150-xlt',
                        label: 'XLT',
                        children: [
                            { id: 'ford-f150-xlt-2024', label: '2024 SuperCrew 4x4' },
                            { id: 'ford-f150-xlt-2025', label: '2025 SuperCrew 4x4' },
                        ],
                    },
                    {
                        id: 'ford-f150-lariat',
                        label: 'Lariat',
                        children: [
                            { id: 'ford-f150-lariat-2024', label: '2024 PowerBoost 4x4' },
                            { id: 'ford-f150-lariat-2025', label: '2025 PowerBoost 4x4' },
                        ],
                    },
                ],
            },
            {
                id: 'ford-maverick',
                label: 'Maverick',
                children: [
                    {
                        id: 'ford-maverick-xl',
                        label: 'XL',
                        children: [
                            { id: 'ford-maverick-xl-2024', label: '2024 hybrid FWD' },
                            { id: 'ford-maverick-xl-2025', label: '2025 hybrid FWD' },
                        ],
                    },
                    {
                        id: 'ford-maverick-lariat',
                        label: 'Lariat',
                        children: [
                            { id: 'ford-maverick-lariat-2024', label: '2024 EcoBoost AWD' },
                            { id: 'ford-maverick-lariat-2025', label: '2025 EcoBoost AWD' },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'tesla',
        label: 'Tesla',
        children: [
            {
                id: 'tesla-model3',
                label: 'Model 3',
                children: [
                    {
                        id: 'tesla-model3-rwd',
                        label: 'RWD',
                        children: [
                            { id: 'tesla-model3-rwd-2024', label: '2024 rear-wheel drive' },
                            { id: 'tesla-model3-rwd-2025', label: '2025 rear-wheel drive' },
                        ],
                    },
                    {
                        id: 'tesla-model3-performance',
                        label: 'Performance',
                        children: [
                            { id: 'tesla-model3-performance-2024', label: '2024 dual motor' },
                            { id: 'tesla-model3-performance-2025', label: '2025 dual motor' },
                        ],
                    },
                ],
            },
            {
                id: 'tesla-modely',
                label: 'Model Y',
                children: [
                    {
                        id: 'tesla-modely-long-range',
                        label: 'Long Range',
                        children: [
                            { id: 'tesla-modely-long-range-2024', label: '2024 dual motor SUV' },
                            { id: 'tesla-modely-long-range-2025', label: '2025 dual motor SUV' },
                        ],
                    },
                    {
                        id: 'tesla-modely-performance',
                        label: 'Performance',
                        children: [
                            { id: 'tesla-modely-performance-2024', label: '2024 dual motor SUV' },
                            { id: 'tesla-modely-performance-2025', label: '2025 dual motor SUV' },
                        ],
                    },
                ],
            },
        ],
    },
];

function renderVehicleNode(node: VehicleNode) {
    const hasChildren = Boolean(node.children?.length);

    return (
        <TreeItem id={node.id} key={node.id} textValue={node.label}>
            <TreeItemContent>
                {({ hasChildItems, isExpanded, level }) => (
                    <div
                        className="rac-tree-item-content"
                        style={{ paddingInlineStart: `calc(${Math.max(level - 1, 0)} * 1rem)` }}
                    >
                        {hasChildItems ? (
                            <Button slot="chevron">{isExpanded ? 'v' : '>'}</Button>
                        ) : (
                            <span aria-hidden="true" className="rac-tree-spacer" />
                        )}
                        <span>{node.label}</span>
                    </div>
                )}
            </TreeItemContent>
            {hasChildren ? node.children?.map(renderVehicleNode) : null}
        </TreeItem>
    );
}

export function App() {
    return (
        <main className="rac-shell">
            <section className="rac-card">
                <p className="rac-eyebrow">React Aria Components</p>
                <h1 className="rac-title">Table and tree comparison</h1>
                <p className="rac-copy">
                    The RAC experiment now mounts a plain table and a plain tree side-by-side so it is easy to
                    compare baseline spacing, padding, and structure before styling decisions harden.
                </p>
                <p className="rac-copy rac-copy-muted">
                    Both datasets are hard-coded in <code>src/rac/app.tsx</code> for now.
                </p>
            </section>

            <section className="rac-comparison" aria-label="RAC data comparison">
                <article className="rac-card rac-panel">
                    <div className="rac-panel-header">
                        <p className="rac-eyebrow">Table</p>
                        <h2 className="rac-section-title">Major airports</h2>
                        <p className="rac-copy rac-copy-muted">
                            Name, abbreviation, location, coordinates, elevation, and a boolean rail-link
                            field.
                        </p>
                    </div>
                    <div className="rac-scroll-region">
                        <Table aria-label="Major airports">
                            <TableHeader>
                                <Column isRowHeader>Name</Column>
                                <Column>Abbreviation</Column>
                                <Column>City</Column>
                                <Column>Country</Column>
                                <Column>Latitude</Column>
                                <Column>Longitude</Column>
                                <Column>Elevation (ft)</Column>
                                <Column>Rail link</Column>
                            </TableHeader>
                            <TableBody>
                                {AIRPORTS.map(airport => (
                                    <Row id={airport.id} key={airport.id}>
                                        <Cell>{airport.name}</Cell>
                                        <Cell>{airport.abbreviation}</Cell>
                                        <Cell>{airport.city}</Cell>
                                        <Cell>{airport.country}</Cell>
                                        <Cell>{airport.latitude.toFixed(4)}</Cell>
                                        <Cell>{airport.longitude.toFixed(4)}</Cell>
                                        <Cell>{airport.elevationFeet}</Cell>
                                        <Cell>{airport.hasRailLink ? 'Yes' : 'No'}</Cell>
                                    </Row>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </article>

                <article className="rac-card rac-panel">
                    <div className="rac-panel-header">
                        <p className="rac-eyebrow">Tree</p>
                        <h2 className="rac-section-title">Consumer vehicles</h2>
                        <p className="rac-copy rac-copy-muted">
                            Makes expand into models, trims, and individual year-level variants.
                        </p>
                    </div>
                    <div className="rac-scroll-region">
                        <Tree
                            aria-label="Consumer vehicles"
                            defaultExpandedKeys={[
                                'toyota',
                                'ford',
                                'tesla',
                                'toyota-camry',
                                'ford-f150',
                                'tesla-model3',
                            ]}
                        >
                            {VEHICLES.map(renderVehicleNode)}
                        </Tree>
                    </div>
                </article>
            </section>
        </main>
    );
}
