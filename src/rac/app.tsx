import { CalendarDate, Time } from '@internationalized/date';
import { type ReactNode, type Ref, useState } from 'react';
import {
    Breadcrumb,
    Breadcrumbs,
    Button,
    Calendar,
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarGridHeader,
    CalendarHeaderCell,
    Cell,
    Checkbox,
    CheckboxGroup,
    ColorArea,
    ColorField,
    ColorPicker,
    ColorSlider,
    ColorSwatch,
    ColorSwatchPicker,
    ColorSwatchPickerItem,
    ColorThumb,
    ColorWheel,
    ColorWheelTrack,
    Column,
    ColumnResizer,
    ComboBox,
    ComboBoxValue,
    DateField,
    DateInput,
    DatePicker,
    DateRangePicker,
    DateSegment,
    Dialog,
    DialogTrigger,
    Disclosure,
    DisclosureGroup,
    DisclosurePanel,
    DropIndicator,
    DropIndicatorContext,
    DropZone,
    FieldError,
    Form,
    GridList,
    GridListHeader,
    GridListItem,
    GridListLoadMoreItem,
    GridListSection,
    Group,
    Header,
    Heading,
    Input,
    Keyboard,
    Label,
    Link,
    ListBox,
    ListBoxItem,
    ListBoxLoadMoreItem,
    ListBoxSection,
    Menu,
    MenuItem,
    MenuSection,
    MenuTrigger,
    Meter,
    Modal,
    ModalOverlay,
    NumberField,
    OverlayArrow,
    Popover,
    ProgressBar,
    Radio,
    RadioGroup,
    RangeCalendar,
    ResizableTableContainer,
    Row,
    SearchField,
    Select,
    SelectionIndicator,
    SelectValue,
    Separator,
    Slider,
    SliderOutput,
    SliderThumb,
    SliderTrack,
    Switch,
    Tab,
    Table,
    TableBody,
    TableHeader,
    TableLoadMoreItem,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    TagGroup,
    TagList,
    Text,
    TextArea,
    TextField,
    TimeField,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
    Tooltip,
    TooltipTrigger,
    Tree,
    TreeHeader,
    TreeItem,
    TreeItemContent,
    TreeLoadMoreItem,
    TreeSection,
    UNSTABLE_Toast,
    UNSTABLE_ToastContent,
    UNSTABLE_ToastList,
    UNSTABLE_ToastQueue,
    UNSTABLE_ToastRegion,
    parseColor,
} from 'react-aria-components';

type Airport = {
    id: string;
    name: string;
    abbreviation: string;
    city: string;
    country: string;
    elevationFeet: number;
    railLink: 'direct' | 'shuttle' | 'none';
};

type TreeNode = {
    id: string;
    label: string;
    meta: string;
    children?: TreeNode[];
};

type ToastMessage = {
    title: string;
    description: string;
};

const AIRPORTS: Airport[] = [
    {
        id: 'atl',
        name: 'Hartsfield-Jackson Atlanta International Airport',
        abbreviation: 'ATL',
        city: 'Atlanta',
        country: 'United States',
        elevationFeet: 1026,
        railLink: 'direct',
    },
    {
        id: 'lhr',
        name: 'Heathrow Airport',
        abbreviation: 'LHR',
        city: 'London',
        country: 'United Kingdom',
        elevationFeet: 83,
        railLink: 'direct',
    },
    {
        id: 'hnd',
        name: 'Tokyo Haneda Airport',
        abbreviation: 'HND',
        city: 'Tokyo',
        country: 'Japan',
        elevationFeet: 21,
        railLink: 'direct',
    },
    {
        id: 'dxb',
        name: 'Dubai International Airport',
        abbreviation: 'DXB',
        city: 'Dubai',
        country: 'United Arab Emirates',
        elevationFeet: 62,
        railLink: 'shuttle',
    },
    {
        id: 'gru',
        name: 'Sao Paulo-Guarulhos International Airport',
        abbreviation: 'GRU',
        city: 'Sao Paulo',
        country: 'Brazil',
        elevationFeet: 2459,
        railLink: 'none',
    },
    {
        id: 'syd',
        name: 'Sydney Airport',
        abbreviation: 'SYD',
        city: 'Sydney',
        country: 'Australia',
        elevationFeet: 21,
        railLink: 'direct',
    },
];

const OPERATIONS_TREE: TreeNode[] = [
    {
        id: 'operations',
        label: 'Operations',
        meta: 'Critical service lane',
        children: [
            {
                id: 'intake',
                label: 'Intake',
                meta: 'Carrier and manifest checks',
                children: [
                    { id: 'intake-forms', label: 'Form parsing', meta: 'Normalizes inbound CSV uploads' },
                    { id: 'intake-exceptions', label: 'Exception routing', meta: 'Escalates blocked lanes' },
                ],
            },
            {
                id: 'handoff',
                label: 'Handoff',
                meta: 'Cross-border handoff sequence',
                children: [
                    { id: 'handoff-atl', label: 'ATL hub', meta: 'Primary east-coast gateway' },
                    { id: 'handoff-lhr', label: 'LHR hub', meta: 'EU airfreight relay' },
                ],
            },
        ],
    },
    {
        id: 'experience',
        label: 'Customer experience',
        meta: 'Buyer-facing service surface',
        children: [
            {
                id: 'tracking',
                label: 'Tracking',
                meta: 'Status milestones and alerts',
                children: [
                    { id: 'tracking-sms', label: 'SMS alerts', meta: 'Outbound status copy' },
                    { id: 'tracking-proof', label: 'Proof capture', meta: 'Scanned handoff receipts' },
                ],
            },
            {
                id: 'support',
                label: 'Support',
                meta: 'Escalation and resolution queues',
                children: [
                    { id: 'support-sla', label: 'SLA timer', meta: 'Flags stalled lanes' },
                    { id: 'support-vip', label: 'VIP routing', meta: 'Dedicated after-hours queue' },
                ],
            },
        ],
    },
];

const TOAST_QUEUE = new UNSTABLE_ToastQueue<ToastMessage>({ maxVisibleToasts: 2 });
let didSeedToastQueue = false;

if (!didSeedToastQueue) {
    didSeedToastQueue = true;
    TOAST_QUEUE.add(
        {
            title: 'Slotting report ready',
            description: 'The compact-density audit is ready for design review.',
        },
        { timeout: 8000 },
    );
    TOAST_QUEUE.add(
        {
            title: 'Overlay preview updated',
            description: 'Popover and dialog samples were refreshed with the dark theme tokens.',
        },
        { timeout: 12000 },
    );
}

function queueToast(message: ToastMessage) {
    TOAST_QUEUE.add(message, { timeout: 7000 });
}

function noop() {}

function renderTreeNode(node: TreeNode) {
    const hasChildren = Boolean(node.children?.length);

    return (
        <TreeItem id={node.id} key={node.id} textValue={node.label}>
            <TreeItemContent>
                {({ hasChildItems, isExpanded }) => (
                    <div className="rac-tree-row">
                        {hasChildItems ? (
                            <Button
                                slot="chevron"
                                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${node.label}`}
                            >
                                {isExpanded ? '-' : '+'}
                            </Button>
                        ) : (
                            <span aria-hidden="true" className="rac-tree-spacer" />
                        )}
                        <SelectionIndicator>•</SelectionIndicator>
                        <div className="rac-tree-copy">
                            <span className="rac-tree-label">{node.label}</span>
                            <span className="rac-tree-meta">{node.meta}</span>
                        </div>
                    </div>
                )}
            </TreeItemContent>
            {hasChildren ? node.children?.map(renderTreeNode) : null}
        </TreeItem>
    );
}

type GallerySectionProps = {
    eyebrow: string;
    id: string;
    title: string;
    description: string;
    children: ReactNode;
};

function GallerySection({ eyebrow, id, title, description, children }: GallerySectionProps) {
    return (
        <section className="rac-gallery-section" aria-labelledby={id}>
            <div className="rac-section-header">
                <p className="rac-section-eyebrow">{eyebrow}</p>
                <h2 className="rac-section-title" id={id}>
                    {title}
                </h2>
                <p className="rac-section-copy">{description}</p>
            </div>
            {children}
        </section>
    );
}

type DemoCardProps = {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
    theme?: 'light' | 'dark';
    density?: 'comfortable' | 'compact';
};

function DemoCard({ title, description, children, className, theme, density }: DemoCardProps) {
    const cardClassName = className ? `rac-demo-card ${className}` : 'rac-demo-card';

    return (
        <article className={cardClassName} data-theme={theme} data-density={density}>
            <div className="rac-card-header">
                <h3 className="rac-card-title">{title}</h3>
                {description ? <p className="rac-card-copy">{description}</p> : null}
            </div>
            {children}
        </article>
    );
}

type OverlaySandboxProps = {
    title: string;
    description: string;
    children: (portalContainer: HTMLDivElement) => ReactNode;
};

function OverlaySandbox({ title, description, children }: OverlaySandboxProps) {
    const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);

    return (
        <DemoCard className="rac-demo-card-overlay" title={title} description={description}>
            <div className="rac-overlay-sandbox">
                {portalContainer ? children(portalContainer) : null}
                <div
                    className="rac-overlay-sandbox__portal"
                    ref={node => {
                        if (node) {
                            setPortalContainer(current => current ?? node);
                        }
                    }}
                />
            </div>
        </DemoCard>
    );
}

function StaticDropIndicatorDemo() {
    return (
        <DropIndicatorContext.Provider
            value={{
                render: (_props, ref) => (
                    <div
                        className="react-aria-DropIndicator"
                        data-drop-target="true"
                        ref={ref as Ref<HTMLDivElement>}
                    >
                        Queued insert position
                    </div>
                ),
            }}
        >
            <DropIndicator target={{ type: 'root' }} />
        </DropIndicatorContext.Provider>
    );
}

export function App() {
    return (
        <main className="rac-app" data-theme="light" data-density="comfortable">
            <section className="rac-hero">
                <Breadcrumbs aria-label="Gallery breadcrumbs">
                    <Breadcrumb id="experiments">
                        <Link href="#rac-gallery">Experiments</Link>
                    </Breadcrumb>
                    <Breadcrumb id="rac">
                        <Link href="#rac-gallery">React Aria Components</Link>
                    </Breadcrumb>
                    <Breadcrumb id="gallery">
                        <Link href="#rac-gallery">Long-lived CSS gallery</Link>
                    </Breadcrumb>
                </Breadcrumbs>

                <div className="rac-section-header">
                    <p className="rac-section-eyebrow">RAC Experiment</p>
                    <h1 className="rac-section-title" id="rac-gallery">
                        RAC Gallery and CSS Structure
                    </h1>
                    <p className="rac-section-copy">
                        This page is the first pass at a long-lived plain-CSS structure for React Aria
                        Components: token tiers, direct component selectors, selector-scoped themes, one
                        public density switch, and a gallery that exercises the full visual-surface set.
                    </p>
                </div>

                <Separator />

                <div className="rac-hero-grid">
                    <DemoCard
                        title="Authoring posture"
                        description="A deliberately small semantic vocabulary should carry most of the system. One-off values stay private to the family that owns them."
                    >
                        <div className="rac-stack-md">
                            <Toolbar aria-label="Gallery toolbar">
                                <Button data-tone="accent">Promote token</Button>
                                <Button>Review state hooks</Button>
                                <Separator aria-orientation="vertical" />
                                <ToggleButtonGroup
                                    aria-label="Preview mode"
                                    defaultSelectedKeys={['comfortable']}
                                    selectionMode="single"
                                >
                                    <ToggleButton id="comfortable">Comfortable</ToggleButton>
                                    <ToggleButton id="compact">Compact</ToggleButton>
                                </ToggleButtonGroup>
                            </Toolbar>

                            <div className="rac-inline-cluster">
                                <span className="rac-pill">alias</span>
                                <span className="rac-pill">semantic</span>
                                <span className="rac-pill">component-local</span>
                                <Keyboard>Shift</Keyboard>
                                <Keyboard>Alt</Keyboard>
                            </div>

                            <p className="rac-card-copy">
                                The gallery keeps its host layout separate from the component contracts, but
                                every visible RAC family below is styled directly with default component
                                classes plus documented <code className="rac-code">data-*</code> state hooks.
                            </p>
                        </div>
                    </DemoCard>

                    <DemoCard
                        title="Nested dark compact island"
                        description="Theme and density are selector-scoped. This preview uses the same component contracts inside a coarse-grained nested island."
                        theme="dark"
                        density="compact"
                    >
                        <div className="rac-theme-preview">
                            <Toolbar aria-label="Compact preview toolbar">
                                <Button data-tone="accent">Approve batch</Button>
                                <Button>Escalate</Button>
                                <ToggleButtonGroup
                                    aria-label="Preview selection"
                                    defaultSelectedKeys={['cards']}
                                    selectionMode="single"
                                >
                                    <ToggleButton id="cards">Cards</ToggleButton>
                                    <ToggleButton id="table">Table</ToggleButton>
                                </ToggleButtonGroup>
                            </Toolbar>

                            <ListBox
                                aria-label="Compact preview list"
                                defaultSelectedKeys={['preview-route']}
                                selectionMode="single"
                            >
                                <ListBoxItem id="preview-route" textValue="Preview route">
                                    <SelectionIndicator>•</SelectionIndicator>
                                    <div className="rac-option-copy">
                                        <span className="rac-option-title">Preview route</span>
                                        <span className="rac-option-meta">Nested theme island</span>
                                    </div>
                                </ListBoxItem>
                                <ListBoxItem id="preview-theme" textValue="Theme swap">
                                    <SelectionIndicator>•</SelectionIndicator>
                                    <div className="rac-option-copy">
                                        <span className="rac-option-title">Theme swap</span>
                                        <span className="rac-option-meta">Dark + compact</span>
                                    </div>
                                </ListBoxItem>
                            </ListBox>
                        </div>
                    </DemoCard>
                </div>
            </section>

            <GallerySection
                eyebrow="Primitives"
                id="primitives"
                title="Text, metadata, and shell primitives"
                description="The low-level pieces stay visually restrained. They provide typography, linking, metadata, and simple grouping without trying to become a second component system."
            >
                <div className="rac-section-grid">
                    <DemoCard
                        title="Copy, links, and separators"
                        description="These are the pieces that everything else leans on."
                    >
                        <div className="rac-stack-md">
                            <p className="rac-card-copy">
                                Shared copy surfaces use <Link href="#fields">hash routes</Link>, inline{' '}
                                <Keyboard>Enter</Keyboard> hints, and a muted secondary color for descriptions
                                rather than component-specific text rules.
                            </p>

                            <Separator />

                            <div className="rac-inline-cluster">
                                <span className="rac-pill">surface-panel</span>
                                <span className="rac-pill">text-secondary</span>
                                <span className="rac-pill">control-gap</span>
                            </div>
                        </div>
                    </DemoCard>

                    <DemoCard
                        title="Form scaffolding"
                        description="Form, label, description, field error, group, and text all show up in one deliberately compact layout."
                    >
                        <Form className="rac-form-grid" validationBehavior="aria">
                            <TextField defaultValue="12%" isInvalid>
                                <Label>Budget guardrail</Label>
                                <Input />
                                <Text slot="description">
                                    Accepted range is 15% to 35% for this lane family.
                                </Text>
                                <FieldError>Outside approved range.</FieldError>
                            </TextField>

                            <TextField defaultValue="Keep padding consistent across table and tree row actions.">
                                <Label>Approver note</Label>
                                <TextArea />
                                <Text slot="description">
                                    This stays local to the RAC gallery and does not imply app-level copy
                                    style.
                                </Text>
                            </TextField>
                        </Form>
                    </DemoCard>
                </div>
            </GallerySection>

            <GallerySection
                eyebrow="Actions"
                id="buttons"
                title="Buttons and choice controls"
                description="Buttons own tone and pressed-state behavior. Choice controls lean on the same shared control tokens, but keep their anatomy private."
            >
                <div className="rac-section-grid">
                    <DemoCard
                        title="Buttons and toggle groups"
                        description="Accent and danger tones are available, but not expanded into a large prop taxonomy."
                    >
                        <div className="rac-stack-md">
                            <div className="rac-inline-cluster">
                                <Button data-tone="accent">Promote semantic token</Button>
                                <Button>Inspect local override</Button>
                                <Button data-tone="danger">Flag regression</Button>
                            </div>

                            <ToggleButtonGroup
                                aria-label="Layout mode"
                                defaultSelectedKeys={['split-view']}
                                selectionMode="single"
                            >
                                <ToggleButton id="split-view">Split view</ToggleButton>
                                <ToggleButton id="stacked">Stacked</ToggleButton>
                                <ToggleButton id="print">Print proof</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </DemoCard>

                    <DemoCard
                        title="Checkboxes, radios, and switch"
                        description="Indicator geometry is private to the family, but the spacing and surface tokens stay shared."
                    >
                        <div className="rac-choice-layout">
                            <CheckboxGroup aria-label="Notification channels" defaultValue={['sms', 'email']}>
                                <Label>Notification channels</Label>
                                <Checkbox value="sms">
                                    <span className="rac-choice-indicator">✓</span>
                                    <div className="rac-choice-copy">
                                        <span className="rac-option-title">SMS alerts</span>
                                        <span className="rac-option-meta">High urgency only</span>
                                    </div>
                                </Checkbox>
                                <Checkbox value="email">
                                    <span className="rac-choice-indicator">✓</span>
                                    <div className="rac-choice-copy">
                                        <span className="rac-option-title">Email digest</span>
                                        <span className="rac-option-meta">Morning summary</span>
                                    </div>
                                </Checkbox>
                                <Checkbox value="ops">
                                    <span className="rac-choice-indicator">✓</span>
                                    <div className="rac-choice-copy">
                                        <span className="rac-option-title">Ops console</span>
                                        <span className="rac-option-meta">Permanent audit trail</span>
                                    </div>
                                </Checkbox>
                            </CheckboxGroup>

                            <RadioGroup
                                aria-label="Density policy"
                                defaultValue="compact"
                                orientation="horizontal"
                            >
                                <Label>Density policy</Label>
                                <Radio value="comfortable">
                                    <span className="rac-choice-indicator">
                                        <SelectionIndicator>•</SelectionIndicator>
                                    </span>
                                    <div className="rac-choice-copy">
                                        <span className="rac-option-title">Comfortable</span>
                                        <span className="rac-option-meta">Broader spacing</span>
                                    </div>
                                </Radio>
                                <Radio value="compact">
                                    <span className="rac-choice-indicator">
                                        <SelectionIndicator>•</SelectionIndicator>
                                    </span>
                                    <div className="rac-choice-copy">
                                        <span className="rac-option-title">Compact</span>
                                        <span className="rac-option-meta">Tighter controls</span>
                                    </div>
                                </Radio>
                            </RadioGroup>

                            <Switch defaultSelected>
                                <div className="rac-switch-layout">
                                    <span className="rac-switch-track">
                                        <span className="rac-switch-thumb" />
                                    </span>
                                    <div className="rac-choice-copy">
                                        <span className="rac-option-title">
                                            Auto-promote safe refinements
                                        </span>
                                        <span className="rac-option-meta">
                                            Still requires human review for new semantic tokens.
                                        </span>
                                    </div>
                                </div>
                            </Switch>
                        </div>
                    </DemoCard>
                </div>
            </GallerySection>

            <GallerySection
                eyebrow="Fields"
                id="fields"
                title="Text, search, and numeric entry"
                description="Fields keep their basic control surface consistent, while family files handle the anatomy differences around clear buttons, steppers, and descriptions."
            >
                <div className="rac-section-grid">
                    <DemoCard
                        title="Text and search fields"
                        description="Descriptions and invalid states are visible in the first pass because they are part of the normal component contract."
                    >
                        <Form className="rac-form-grid" validationBehavior="aria">
                            <TextField defaultValue="Priority medical relay">
                                <Label>Lane title</Label>
                                <Input />
                                <Text slot="description">
                                    This field uses the shared control tokens directly.
                                </Text>
                            </TextField>

                            <SearchField defaultValue="Haneda">
                                <Label>Search airport routes</Label>
                                <Group>
                                    <Input />
                                    <Button aria-label="Clear search">Clear</Button>
                                </Group>
                                <Text slot="description">
                                    SearchField owns the clear-button behavior but reuses the same surface.
                                </Text>
                            </SearchField>
                        </Form>
                    </DemoCard>

                    <DemoCard
                        title="Numeric steppers"
                        description="NumberField uses increment and decrement slots instead of inventing a separate visual language."
                    >
                        <NumberField defaultValue={18} maxValue={32} minValue={4} step={2}>
                            <Label>Compact row height</Label>
                            <Group>
                                <Button slot="decrement" aria-label="Decrease compact row height">
                                    -
                                </Button>
                                <Input />
                                <Button slot="increment" aria-label="Increase compact row height">
                                    +
                                </Button>
                            </Group>
                            <Text slot="description">
                                This stays component-local until a shared control-height pattern is proven.
                            </Text>
                        </NumberField>
                    </DemoCard>
                </div>
            </GallerySection>

            <GallerySection
                eyebrow="Selection"
                id="lists"
                title="List, select, combo, menu, and tags"
                description="The selection-heavy families intentionally share a lot of visual rhythm, but keep the menu, tags, and standalone listbox rules in their own files."
            >
                <div className="rac-list-grid">
                    <DemoCard
                        title="Standalone listbox"
                        description="Sections, selection indicators, and load-more affordances are visible here."
                    >
                        <ListBox
                            aria-label="Shipment lanes"
                            defaultSelectedKeys={['lane-02']}
                            selectionMode="single"
                        >
                            <ListBoxSection aria-label="Nearshore lanes">
                                <Header>Nearshore lanes</Header>
                                <ListBoxItem id="lane-01" textValue="Chicago staging">
                                    <SelectionIndicator>•</SelectionIndicator>
                                    <div className="rac-option-copy">
                                        <span className="rac-option-title">Chicago staging</span>
                                        <span className="rac-option-meta">4 active vendors</span>
                                    </div>
                                    <span className="rac-pill">Normal</span>
                                </ListBoxItem>
                                <ListBoxItem id="lane-02" textValue="Atlanta medical lane">
                                    <SelectionIndicator>•</SelectionIndicator>
                                    <div className="rac-option-copy">
                                        <span className="rac-option-title">Atlanta medical lane</span>
                                        <span className="rac-option-meta">Temperature controlled</span>
                                    </div>
                                    <span className="rac-status-pill" data-tone="danger">
                                        Urgent
                                    </span>
                                </ListBoxItem>
                            </ListBoxSection>
                            <ListBoxSection aria-label="Overseas lanes">
                                <Header>Overseas lanes</Header>
                                <ListBoxItem id="lane-03" textValue="Heathrow relay">
                                    <SelectionIndicator>•</SelectionIndicator>
                                    <div className="rac-option-copy">
                                        <span className="rac-option-title">Heathrow relay</span>
                                        <span className="rac-option-meta">Cross-dock checkpoint</span>
                                    </div>
                                    <span className="rac-status-pill">Stable</span>
                                </ListBoxItem>
                            </ListBoxSection>
                            <ListBoxLoadMoreItem isLoading onLoadMore={noop}>
                                Polling live capacity…
                            </ListBoxLoadMoreItem>
                        </ListBox>
                    </DemoCard>

                    <DemoCard
                        title="Select and combo box"
                        description="SelectValue and ComboBoxValue are both rendered so their placeholder and selected-value states are visible."
                    >
                        <div className="rac-stack-lg">
                            <Select defaultSelectedKey="lagoon">
                                <Label>Review lane</Label>
                                <Button>
                                    <SelectValue />
                                    <span aria-hidden="true">v</span>
                                </Button>
                                <Text slot="description">
                                    Select keeps the button as the owned visual surface.
                                </Text>
                                <Popover>
                                    <OverlayArrow>
                                        <svg aria-hidden="true" viewBox="0 0 12 12">
                                            <path d="M0 0h12v12H0z" />
                                        </svg>
                                    </OverlayArrow>
                                    <ListBox aria-label="Review lane options">
                                        <ListBoxItem id="lagoon">Lagoon relay</ListBoxItem>
                                        <ListBoxItem id="apex">Apex route</ListBoxItem>
                                        <ListBoxItem id="horizon">Horizon reserve</ListBoxItem>
                                    </ListBox>
                                </Popover>
                            </Select>

                            <ComboBox defaultSelectedKey="hnd">
                                <Label>Filter airports</Label>
                                <Group>
                                    <Input />
                                    <Button aria-label="Toggle airport options">v</Button>
                                </Group>
                                <ComboBoxValue placeholder="No airport selected" />
                                <Text slot="description">
                                    ComboBox keeps the text input, button, listbox, and selected value
                                    distinct.
                                </Text>
                                <Popover>
                                    <OverlayArrow>
                                        <svg aria-hidden="true" viewBox="0 0 12 12">
                                            <path d="M0 0h12v12H0z" />
                                        </svg>
                                    </OverlayArrow>
                                    <ListBox aria-label="Airport matches">
                                        <ListBoxItem id="atl">Atlanta</ListBoxItem>
                                        <ListBoxItem id="hnd">Haneda</ListBoxItem>
                                        <ListBoxItem id="lhr">Heathrow</ListBoxItem>
                                    </ListBox>
                                </Popover>
                            </ComboBox>
                        </div>
                    </DemoCard>

                    <DemoCard
                        title="Tags"
                        description="Tags stay lightweight; they should not grow into a second full-blown chip framework."
                    >
                        <TagGroup
                            aria-label="Applied filters"
                            defaultSelectedKeys={['expedite']}
                            selectionMode="multiple"
                        >
                            <Label>Applied filters</Label>
                            <TagList>
                                <Tag id="cold-chain" textValue="Cold chain">
                                    Cold chain
                                </Tag>
                                <Tag id="expedite" textValue="Expedite">
                                    Expedite
                                </Tag>
                                <Tag id="night" textValue="Night handoff">
                                    Night handoff
                                </Tag>
                            </TagList>
                            <Text slot="description">
                                Tags use the same public control vocabulary, but keep their pill geometry
                                local.
                            </Text>
                        </TagGroup>
                    </DemoCard>
                </div>
            </GallerySection>

            <GallerySection
                eyebrow="Collections"
                id="collections"
                title="Grid list, table, tree, tabs, disclosure, and toolbar"
                description="These higher-structure families are where the token split starts paying off: shared surfaces and spacing, but locally-owned anatomy for headers, resizers, hierarchies, and panels."
            >
                <div className="rac-collection-grid">
                    <DemoCard
                        title="Grid list"
                        description="Header, section, items, and load-more sentinel all have visible coverage."
                    >
                        <GridList
                            aria-label="Queued sprint work"
                            defaultSelectedKeys={['audit-02']}
                            selectionMode="multiple"
                        >
                            <GridListHeader>Queued sprint work</GridListHeader>
                            <GridListSection aria-label="Now">
                                <Header>Now</Header>
                                <GridListItem id="audit-01" textValue="Vendor reassessment">
                                    <div className="rac-grid-copy">
                                        <span className="rac-grid-title">Vendor reassessment</span>
                                        <Text slot="description">Procurement · 2 blockers</Text>
                                    </div>
                                </GridListItem>
                                <GridListItem id="audit-02" textValue="Compact spacing review">
                                    <div className="rac-grid-copy">
                                        <span className="rac-grid-title">Compact spacing review</span>
                                        <Text slot="description">Design systems · due today</Text>
                                    </div>
                                </GridListItem>
                            </GridListSection>
                            <GridListSection aria-label="Later">
                                <Header>Later</Header>
                                <GridListItem id="audit-03" textValue="Toast timing cleanup">
                                    <div className="rac-grid-copy">
                                        <span className="rac-grid-title">Toast timing cleanup</span>
                                        <Text slot="description">Infrastructure · background task</Text>
                                    </div>
                                </GridListItem>
                            </GridListSection>
                            <GridListLoadMoreItem isLoading onLoadMore={noop}>
                                Loading overflow work…
                            </GridListLoadMoreItem>
                        </GridList>
                    </DemoCard>

                    <DemoCard
                        title="Resizable table"
                        description="The table includes row selection, a status pill, a row header column, a load-more row, and visible column resizers."
                    >
                        <ResizableTableContainer>
                            <Table
                                aria-label="Major airports"
                                defaultSelectedKeys={['hnd']}
                                selectionMode="single"
                            >
                                <TableHeader>
                                    <Column defaultWidth="2.2fr" isRowHeader>
                                        Airport
                                        <ColumnResizer />
                                    </Column>
                                    <Column defaultWidth="1fr">
                                        City
                                        <ColumnResizer />
                                    </Column>
                                    <Column defaultWidth="0.8fr">
                                        Code
                                        <ColumnResizer />
                                    </Column>
                                    <Column>Elevation</Column>
                                    <Column>Rail link</Column>
                                </TableHeader>
                                <TableBody>
                                    {AIRPORTS.map(airport => (
                                        <Row id={airport.id} key={airport.id}>
                                            <Cell>
                                                <div className="rac-option-copy">
                                                    <Link href={`#airport-${airport.id}`}>
                                                        {airport.name}
                                                    </Link>
                                                    <span className="rac-option-meta">{airport.country}</span>
                                                </div>
                                            </Cell>
                                            <Cell>{airport.city}</Cell>
                                            <Cell>{airport.abbreviation}</Cell>
                                            <Cell>{airport.elevationFeet} ft</Cell>
                                            <Cell>
                                                <span
                                                    className="rac-status-pill"
                                                    data-tone={
                                                        airport.railLink === 'none' ? 'danger' : 'neutral'
                                                    }
                                                >
                                                    {airport.railLink}
                                                </span>
                                            </Cell>
                                        </Row>
                                    ))}
                                    <TableLoadMoreItem isLoading onLoadMore={noop}>
                                        Syncing additional airport records…
                                    </TableLoadMoreItem>
                                </TableBody>
                            </Table>
                        </ResizableTableContainer>
                    </DemoCard>

                    <DemoCard
                        title="Tree"
                        description="TreeHeader, TreeSection, TreeItemContent, nested rows, and TreeLoadMoreItem are all present in the first pass."
                    >
                        <Tree
                            aria-label="Service tree"
                            defaultExpandedKeys={['operations', 'experience', 'intake', 'tracking']}
                            defaultSelectedKeys={['tracking-proof']}
                            selectionMode="single"
                        >
                            <TreeHeader>Service map</TreeHeader>
                            <TreeSection aria-label="Core services">
                                <Header>Core services</Header>
                                {OPERATIONS_TREE.map(renderTreeNode)}
                            </TreeSection>
                            <TreeLoadMoreItem isLoading onLoadMore={noop}>
                                Gathering more branches…
                            </TreeLoadMoreItem>
                        </Tree>
                    </DemoCard>

                    <DemoCard
                        title="Tabs, disclosure, and toolbar"
                        description="These are smaller families, but they still need deliberate styling coverage so they do not drift into one-off app code."
                    >
                        <div className="rac-stack-lg">
                            <Tabs defaultSelectedKey="tokens">
                                <TabList aria-label="Authoring views">
                                    <Tab id="tokens">Tokens</Tab>
                                    <Tab id="states">States</Tab>
                                    <Tab id="escapes">Escape hatches</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel id="tokens">
                                        Semantic tokens stay intentionally small and cross-cutting.
                                    </TabPanel>
                                    <TabPanel id="states">
                                        Hover, pressed, selected, disabled, and expanded remain state hooks.
                                    </TabPanel>
                                    <TabPanel id="escapes">
                                        Component-local tokens use <code className="rac-code">--_*</code> and
                                        stay private until repeated pressure proves promotion.
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                            <DisclosureGroup allowsMultipleExpanded defaultExpandedKeys={['density']}>
                                <Disclosure id="density">
                                    <Button slot="trigger">Density policy</Button>
                                    <DisclosurePanel>
                                        One public density switch is exposed. Layout spacing, control padding,
                                        and interaction gaps respond; typography does not shrink
                                        automatically.
                                    </DisclosurePanel>
                                </Disclosure>
                                <Disclosure id="themes">
                                    <Button slot="trigger">Theme islands</Button>
                                    <DisclosurePanel>
                                        Theme islands are supported for coarse boundaries like previews and
                                        dialogs, not as a substitute for component-local tuning.
                                    </DisclosurePanel>
                                </Disclosure>
                            </DisclosureGroup>

                            <Toolbar aria-label="Secondary toolbar">
                                <Button>Publish</Button>
                                <Button>Diff</Button>
                                <Separator aria-orientation="vertical" />
                                <ToggleButtonGroup
                                    aria-label="Review mode"
                                    defaultSelectedKeys={['audit']}
                                    selectionMode="single"
                                >
                                    <ToggleButton id="audit">Audit</ToggleButton>
                                    <ToggleButton id="preview">Preview</ToggleButton>
                                </ToggleButtonGroup>
                            </Toolbar>
                        </div>
                    </DemoCard>
                </div>
            </GallerySection>

            <GallerySection
                eyebrow="Dates"
                id="dates"
                title="Date and time controls"
                description="Date segments, inline calendars, and picker shells all share the same semantic surface roles while keeping date-specific anatomy private."
            >
                <div className="rac-section-grid">
                    <DemoCard
                        title="Date field and time field"
                        description="Editable segments stay visibly distinct, especially for placeholder and focus-visible states."
                    >
                        <div className="rac-date-layout">
                            <DateField defaultValue={new CalendarDate(2026, 4, 18)}>
                                <Label>Checkpoint date</Label>
                                <DateInput>{segment => <DateSegment segment={segment} />}</DateInput>
                                <Text slot="description">
                                    Standalone date fields expose their segment anatomy directly.
                                </Text>
                            </DateField>

                            <TimeField defaultValue={new Time(14, 30)}>
                                <Label>Handoff window</Label>
                                <DateInput>{segment => <DateSegment segment={segment} />}</DateInput>
                                <Text slot="description">
                                    Time fields reuse the same input and segment styling.
                                </Text>
                            </TimeField>
                        </div>
                    </DemoCard>

                    <DemoCard
                        title="Date picker and range picker"
                        description="The input shells are visible here; the calendar overlays are demonstrated separately in the overlay section."
                    >
                        <div className="rac-date-layout">
                            <DatePicker defaultValue={new CalendarDate(2026, 4, 21)}>
                                <Label>Departure date</Label>
                                <Group>
                                    <DateInput>{segment => <DateSegment segment={segment} />}</DateInput>
                                    <Button aria-label="Toggle departure calendar">v</Button>
                                </Group>
                                <Text slot="description">Picker shells share the same control tokens.</Text>
                                <Popover>
                                    <Dialog aria-label="Departure calendar">
                                        <Calendar defaultFocusedValue={new CalendarDate(2026, 4, 21)}>
                                            <div className="rac-calendar-toolbar">
                                                <Button slot="previous" aria-label="Previous month">
                                                    &lt;
                                                </Button>
                                                <Heading />
                                                <Button slot="next" aria-label="Next month">
                                                    &gt;
                                                </Button>
                                            </div>
                                            <CalendarGrid>
                                                <CalendarGridHeader>
                                                    {day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
                                                </CalendarGridHeader>
                                                <CalendarGridBody>
                                                    {date => <CalendarCell date={date} />}
                                                </CalendarGridBody>
                                            </CalendarGrid>
                                        </Calendar>
                                    </Dialog>
                                </Popover>
                            </DatePicker>

                            <DateRangePicker
                                defaultValue={{
                                    start: new CalendarDate(2026, 4, 24),
                                    end: new CalendarDate(2026, 4, 29),
                                }}
                            >
                                <Label>Freeze window</Label>
                                <Group>
                                    <DateInput slot="start">
                                        {segment => <DateSegment segment={segment} />}
                                    </DateInput>
                                    <span className="rac-date-range-separator" aria-hidden="true">
                                        to
                                    </span>
                                    <DateInput slot="end">
                                        {segment => <DateSegment segment={segment} />}
                                    </DateInput>
                                    <Button aria-label="Toggle freeze window calendar">v</Button>
                                </Group>
                                <Text slot="description">
                                    Range pickers use the same shell, but keep their multi-value anatomy
                                    local.
                                </Text>
                                <Popover>
                                    <Dialog aria-label="Freeze window calendar">
                                        <RangeCalendar
                                            defaultFocusedValue={new CalendarDate(2026, 4, 24)}
                                            visibleDuration={{ months: 1 }}
                                        >
                                            <div className="rac-calendar-toolbar">
                                                <Button slot="previous" aria-label="Previous month">
                                                    &lt;
                                                </Button>
                                                <Heading />
                                                <Button slot="next" aria-label="Next month">
                                                    &gt;
                                                </Button>
                                            </div>
                                            <CalendarGrid>
                                                <CalendarGridHeader>
                                                    {day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
                                                </CalendarGridHeader>
                                                <CalendarGridBody>
                                                    {date => <CalendarCell date={date} />}
                                                </CalendarGridBody>
                                            </CalendarGrid>
                                        </RangeCalendar>
                                    </Dialog>
                                </Popover>
                            </DateRangePicker>
                        </div>
                    </DemoCard>

                    <DemoCard
                        title="Inline calendars"
                        description="Calendar and RangeCalendar remain separate families because their selection anatomy and range states differ."
                    >
                        <div className="rac-stack-lg">
                            <Calendar
                                aria-label="Sprint checkpoint calendar"
                                defaultValue={new CalendarDate(2026, 4, 18)}
                            >
                                <div className="rac-calendar-toolbar">
                                    <Button slot="previous" aria-label="Previous month">
                                        &lt;
                                    </Button>
                                    <Heading />
                                    <Button slot="next" aria-label="Next month">
                                        &gt;
                                    </Button>
                                </div>
                                <CalendarGrid>
                                    <CalendarGridHeader>
                                        {day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
                                    </CalendarGridHeader>
                                    <CalendarGridBody>
                                        {date => <CalendarCell date={date} />}
                                    </CalendarGridBody>
                                </CalendarGrid>
                            </Calendar>

                            <RangeCalendar
                                aria-label="Freeze window calendar"
                                defaultValue={{
                                    start: new CalendarDate(2026, 5, 2),
                                    end: new CalendarDate(2026, 5, 6),
                                }}
                                visibleDuration={{ months: 2 }}
                            >
                                <div className="rac-calendar-toolbar">
                                    <Button slot="previous" aria-label="Previous month">
                                        &lt;
                                    </Button>
                                    <Heading />
                                    <Button slot="next" aria-label="Next month">
                                        &gt;
                                    </Button>
                                </div>
                                <div className="rac-inline-cluster">
                                    <CalendarGrid>
                                        <CalendarGridHeader>
                                            {day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
                                        </CalendarGridHeader>
                                        <CalendarGridBody>
                                            {date => <CalendarCell date={date} />}
                                        </CalendarGridBody>
                                    </CalendarGrid>
                                    <CalendarGrid offset={{ months: 1 }}>
                                        <CalendarGridHeader>
                                            {day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
                                        </CalendarGridHeader>
                                        <CalendarGridBody>
                                            {date => <CalendarCell date={date} />}
                                        </CalendarGridBody>
                                    </CalendarGrid>
                                </div>
                            </RangeCalendar>
                        </div>
                    </DemoCard>
                </div>
            </GallerySection>

            <GallerySection
                eyebrow="Color"
                id="color"
                title="Color editing and swatch selection"
                description="The color families are composition-heavy, so the gallery renders the provider plus every visible editing surface it coordinates."
            >
                <div className="rac-section-grid">
                    <DemoCard
                        title="Linked color surfaces"
                        description="ColorPicker owns state; the visible surfaces below are the actual styling targets."
                    >
                        <ColorPicker defaultValue={parseColor('#4f7cff')}>
                            <div className="rac-color-picker-shell">
                                <div className="rac-color-picker-grid">
                                    <ColorArea
                                        aria-label="Saturation and brightness"
                                        colorSpace="hsb"
                                        xChannel="saturation"
                                        yChannel="brightness"
                                    >
                                        <ColorThumb />
                                    </ColorArea>

                                    <div className="rac-color-sidebar">
                                        <ColorWheel aria-label="Hue wheel" innerRadius={58} outerRadius={84}>
                                            <ColorWheelTrack />
                                            <ColorThumb />
                                        </ColorWheel>

                                        <ColorSwatch aria-label="Current swatch" />
                                    </div>
                                </div>

                                <div className="rac-form-split">
                                    <ColorSlider channel="hue" colorSpace="hsb">
                                        <div className="rac-inline-spread">
                                            <Label />
                                            <SliderOutput />
                                        </div>
                                        <SliderTrack>
                                            <ColorThumb />
                                        </SliderTrack>
                                    </ColorSlider>

                                    <ColorSlider channel="alpha">
                                        <div className="rac-inline-spread">
                                            <Label />
                                            <SliderOutput />
                                        </div>
                                        <SliderTrack>
                                            <ColorThumb />
                                        </SliderTrack>
                                    </ColorSlider>
                                </div>

                                <div className="rac-form-split">
                                    <ColorField>
                                        <Label>Hex</Label>
                                        <Input />
                                    </ColorField>
                                    <ColorField channel="hue" colorSpace="hsb">
                                        <Label>Hue</Label>
                                        <Input />
                                    </ColorField>
                                </div>

                                <ColorSwatchPicker aria-label="Suggested swatches">
                                    <ColorSwatchPickerItem color="#4f7cff">
                                        <ColorSwatch />
                                    </ColorSwatchPickerItem>
                                    <ColorSwatchPickerItem color="#15a08a">
                                        <ColorSwatch />
                                    </ColorSwatchPickerItem>
                                    <ColorSwatchPickerItem color="#ffb020">
                                        <ColorSwatch />
                                    </ColorSwatchPickerItem>
                                    <ColorSwatchPickerItem color="#f45b7a">
                                        <ColorSwatch />
                                    </ColorSwatchPickerItem>
                                </ColorSwatchPicker>
                            </div>
                        </ColorPicker>
                    </DemoCard>
                </div>
            </GallerySection>

            <GallerySection
                eyebrow="Progress"
                id="range"
                title="Range, meter, and progress"
                description="These share a simple geometry vocabulary without collapsing into a fake universal control-height abstraction."
            >
                <div className="rac-section-grid">
                    <DemoCard
                        title="Slider"
                        description="SliderTrack, SliderOutput, and SliderThumb all need first-pass coverage because they are visible and user-draggable."
                    >
                        <Slider defaultValue={68}>
                            <div className="rac-inline-spread">
                                <Label>Capacity threshold</Label>
                                <SliderOutput />
                            </div>
                            <SliderTrack>
                                {({ state }) => (
                                    <>
                                        <div
                                            className="rac-slider-fill"
                                            style={{ width: `${state.getThumbPercent(0) * 100}%` }}
                                        />
                                        <SliderThumb />
                                    </>
                                )}
                            </SliderTrack>
                            <Text slot="description">
                                This family keeps its fill and thumb geometry private.
                            </Text>
                        </Slider>
                    </DemoCard>

                    <DemoCard
                        title="Meter and progress bar"
                        description="Both render percentage-driven fills, but they convey different semantics."
                    >
                        <div className="rac-progress-layout">
                            <Meter aria-label="Rail-linked airports" value={5} minValue={0} maxValue={6}>
                                {({ percentage, valueText }) => (
                                    <div className="rac-stack-sm">
                                        <div className="rac-inline-spread">
                                            <Label>Rail-linked airports</Label>
                                            <span className="rac-code">{valueText}</span>
                                        </div>
                                        <div className="rac-meter-shell">
                                            <div
                                                className="rac-meter-track"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Meter>

                            <ProgressBar aria-label="Migration progress" value={72}>
                                {({ percentage, valueText }) => (
                                    <div className="rac-stack-sm">
                                        <div className="rac-inline-spread">
                                            <Label>Migration progress</Label>
                                            <span className="rac-code">{valueText}</span>
                                        </div>
                                        <div className="rac-progress-shell">
                                            <div
                                                className="rac-progress-track"
                                                style={{ width: `${percentage ?? 0}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </ProgressBar>
                        </div>
                    </DemoCard>
                </div>
            </GallerySection>

            <GallerySection
                eyebrow="Overlays"
                id="overlays"
                title="Menus, popovers, dialogs, modal overlays, tooltips, drag surfaces, and toast"
                description="These examples use local portal containers so the gallery can show open overlay states without turning the whole page into one giant full-screen demo."
            >
                <div className="rac-section-grid">
                    <OverlaySandbox
                        title="Popover and dialog"
                        description="Popover and Dialog are rendered open in-place so their first-pass styles are visible immediately."
                    >
                        {portalContainer => (
                            <>
                                <div className="rac-overlay-trigger-row">
                                    <DialogTrigger defaultOpen>
                                        <Button data-tone="accent">Preview layout audit</Button>
                                        <Popover UNSTABLE_portalContainer={portalContainer}>
                                            <OverlayArrow>
                                                <svg aria-hidden="true" viewBox="0 0 12 12">
                                                    <path d="M0 0h12v12H0z" />
                                                </svg>
                                            </OverlayArrow>
                                            <Dialog aria-label="Layout audit preview">
                                                <Heading slot="title">Layout audit preview</Heading>
                                                <Text>
                                                    Cross-family spacing drift is currently below the review
                                                    threshold.
                                                </Text>
                                                <Text slot="description">
                                                    Popover, OverlayArrow, and Dialog all remain separate
                                                    styling targets.
                                                </Text>
                                                <Button slot="close">Dismiss</Button>
                                            </Dialog>
                                        </Popover>
                                    </DialogTrigger>
                                </div>
                            </>
                        )}
                    </OverlaySandbox>

                    <OverlaySandbox
                        title="Open menu"
                        description="Menu, MenuSection, and MenuItem are rendered open with a local portal so keyboard hints and selection indicators stay visible."
                    >
                        {portalContainer => (
                            <div className="rac-overlay-trigger-row">
                                <MenuTrigger defaultOpen>
                                    <Button>Open actions</Button>
                                    <Popover UNSTABLE_portalContainer={portalContainer}>
                                        <OverlayArrow>
                                            <svg aria-hidden="true" viewBox="0 0 12 12">
                                                <path d="M0 0h12v12H0z" />
                                            </svg>
                                        </OverlayArrow>
                                        <Menu
                                            aria-label="Action menu"
                                            defaultSelectedKeys={['alerts']}
                                            selectionMode="multiple"
                                        >
                                            <MenuSection aria-label="Inspect">
                                                <Header>Inspect</Header>
                                                <MenuItem id="preview" textValue="Preview spacing">
                                                    <SelectionIndicator>•</SelectionIndicator>
                                                    <div className="rac-menu-copy">
                                                        <span className="rac-menu-title">
                                                            Preview spacing
                                                        </span>
                                                        <Text slot="description">
                                                            Open density comparison
                                                        </Text>
                                                    </div>
                                                    <Keyboard>P</Keyboard>
                                                </MenuItem>
                                            </MenuSection>
                                            <MenuSection aria-label="Delivery">
                                                <Header>Delivery</Header>
                                                <MenuItem id="alerts" textValue="Pin alerts">
                                                    <SelectionIndicator>•</SelectionIndicator>
                                                    <div className="rac-menu-copy">
                                                        <span className="rac-menu-title">Pin alerts</span>
                                                        <Text slot="description">
                                                            Keep escalation signals visible
                                                        </Text>
                                                    </div>
                                                    <Keyboard>A</Keyboard>
                                                </MenuItem>
                                                <MenuItem id="export" textValue="Export notes">
                                                    <SelectionIndicator>•</SelectionIndicator>
                                                    <div className="rac-menu-copy">
                                                        <span className="rac-menu-title">Export notes</span>
                                                        <Text slot="description">
                                                            Bundle current gallery snapshot
                                                        </Text>
                                                    </div>
                                                    <Keyboard>E</Keyboard>
                                                </MenuItem>
                                            </MenuSection>
                                        </Menu>
                                    </Popover>
                                </MenuTrigger>
                            </div>
                        )}
                    </OverlaySandbox>

                    <OverlaySandbox
                        title="Tooltip and modal overlay"
                        description="The tooltip is shown in-place; the modal remains launchable so the page does not boot into an inert state."
                    >
                        {portalContainer => (
                            <div className="rac-stack-lg">
                                <div className="rac-overlay-trigger-row">
                                    <TooltipTrigger defaultOpen delay={0}>
                                        <Button>Hover contract</Button>
                                        <Tooltip UNSTABLE_portalContainer={portalContainer}>
                                            <OverlayArrow>
                                                <svg aria-hidden="true" viewBox="0 0 12 12">
                                                    <path d="M0 0h12v12H0z" />
                                                </svg>
                                            </OverlayArrow>
                                            Hover is a state hook, not a public variant surface.
                                        </Tooltip>
                                    </TooltipTrigger>
                                </div>

                                <DialogTrigger>
                                    <Button data-tone="accent">Open modal example</Button>
                                    <ModalOverlay UNSTABLE_portalContainer={portalContainer}>
                                        <Modal>
                                            <Dialog aria-label="Modal review">
                                                <Heading slot="title">Modal review</Heading>
                                                <Text>
                                                    Modal and ModalOverlay are styled separately so the
                                                    backdrop, frame, and dialog content do not collapse into a
                                                    single rule.
                                                </Text>
                                                <Button slot="close">Close</Button>
                                            </Dialog>
                                        </Modal>
                                    </ModalOverlay>
                                </DialogTrigger>
                            </div>
                        )}
                    </OverlaySandbox>

                    <DemoCard
                        title="Drop zone, drop indicator, and toast"
                        description="DropZone is rendered directly; DropIndicator and Toast use the smallest viable gallery scaffolding because their normal rendering paths are context-driven."
                    >
                        <div className="rac-stack-lg">
                            <DropZone aria-label="Manifest drop zone" onDrop={noop}>
                                <Text slot="label">Drop manifest bundle or paste it here</Text>
                                <Text>Accepts CSV, JSON, and plain-text notes.</Text>
                            </DropZone>

                            <StaticDropIndicatorDemo />

                            <div className="rac-toast-actions">
                                <Button
                                    onPress={() =>
                                        queueToast({
                                            title: 'Theme island added',
                                            description: 'A nested dark card was added to the hero section.',
                                        })
                                    }
                                >
                                    Add toast
                                </Button>
                                <Button
                                    onPress={() =>
                                        queueToast({
                                            title: 'Compact review queued',
                                            description:
                                                'Spacing and padding were added to the verification list.',
                                        })
                                    }
                                >
                                    Add compact toast
                                </Button>
                            </div>

                            <div className="rac-overlay-sandbox">
                                <UNSTABLE_ToastRegion aria-label="Notification queue" queue={TOAST_QUEUE}>
                                    <UNSTABLE_ToastList>
                                        {({ toast }) => {
                                            const content = toast.content as ToastMessage;

                                            return (
                                                <UNSTABLE_Toast toast={toast}>
                                                    <UNSTABLE_ToastContent>
                                                        <Text slot="title">{content.title}</Text>
                                                        <Text slot="description">{content.description}</Text>
                                                    </UNSTABLE_ToastContent>
                                                    <Button
                                                        slot="close"
                                                        aria-label={`Dismiss ${content.title}`}
                                                    >
                                                        Close
                                                    </Button>
                                                </UNSTABLE_Toast>
                                            );
                                        }}
                                    </UNSTABLE_ToastList>
                                </UNSTABLE_ToastRegion>
                            </div>
                        </div>
                    </DemoCard>
                </div>
            </GallerySection>
        </main>
    );
}
