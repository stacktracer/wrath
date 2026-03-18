import {
    Button,
    Cell,
    Collection,
    Column,
    Row,
    Table,
    TableBody,
    TableHeader,
    Tree,
    TreeItem,
    TreeItemContent,
} from 'react-aria-components';

const treeData = [
    {
        id: 'workspace',
        name: 'Workspace',
        children: [
            {
                id: 'notes',
                name: 'Notes',
                children: [
                    { id: 'notes-today', name: 'today.txt' },
                    { id: 'notes-ideas', name: 'ideas.txt' },
                ],
            },
            {
                id: 'reference',
                name: 'Reference',
                children: [
                    { id: 'ref-api', name: 'api.md' },
                    { id: 'ref-schema', name: 'schema.md' },
                ],
            },
            { id: 'todo', name: 'todo.txt' },
        ],
    },
    {
        id: 'archive',
        name: 'Archive',
        children: [
            { id: 'archive-2024', name: '2024.zip' },
            { id: 'archive-2025', name: '2025.zip' },
        ],
    },
];

const tableData = [
    { id: 'f1', name: 'today.txt', size: '2 KB', modified: 'Today' },
    { id: 'f2', name: 'ideas.txt', size: '8 KB', modified: 'Yesterday' },
    { id: 'f3', name: 'api.md', size: '15 KB', modified: '3 days ago' },
    { id: 'f4', name: 'schema.md', size: '4 KB', modified: 'Last week' },
    { id: 'f5', name: 'todo.txt', size: '1 KB', modified: 'Today' },
];

type TreeNode = {
    id: string;
    name: string;
    children?: TreeNode[];
};

export function App(): React.JSX.Element {
    return (
        <main className="app-shell">
            <section className="app-card">
                <h1 className="app-title">Wrath</h1>
                <p className="app-copy">
                    RAC tree and table, direct styled, intentionally mostly ugly for evaluation.
                </p>
                <Tree
                    aria-label="Project tree"
                    className="app-tree"
                    defaultExpandedKeys={['workspace', 'notes']}
                    selectionMode="single"
                >
                    <Collection items={treeData}>{item => renderTreeItem(item)}</Collection>
                </Tree>
                <Table aria-label="Files" className="app-table" selectionMode="single">
                    <TableHeader>
                        <Column id="name" isRowHeader>
                            Name
                        </Column>
                        <Column id="size">Size</Column>
                        <Column id="modified">Modified</Column>
                    </TableHeader>
                    <TableBody items={tableData}>
                        {row => (
                            <Row id={row.id}>
                                <Cell>{row.name}</Cell>
                                <Cell>{row.size}</Cell>
                                <Cell>{row.modified}</Cell>
                            </Row>
                        )}
                    </TableBody>
                </Table>
            </section>
        </main>
    );
}

function renderTreeItem(item: TreeNode): React.JSX.Element {
    return (
        <TreeItem
            id={item.id}
            textValue={item.name}
            hasChildItems={!!item.children?.length}
            className="tree-item"
        >
            <TreeItemContent>
                <div className="tree-row">
                    <Button slot="chevron" className="tree-chevron">
                        ▸
                    </Button>
                    <span className="tree-label">{item.name}</span>
                </div>
            </TreeItemContent>
            {item.children ? (
                <Collection items={item.children}>{child => renderTreeItem(child)}</Collection>
            ) : null}
        </TreeItem>
    );
}
