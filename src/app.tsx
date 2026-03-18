import { useMemo, useState } from 'react';
import {
    Button,
    Cell,
    Collection,
    Column,
    Row,
    type SortDescriptor,
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
    { id: 'f1', name: 'today.txt', size: '2 KB', sizeKb: 2, modified: 'Today', modifiedOrder: 0 },
    { id: 'f2', name: 'ideas.txt', size: '8 KB', sizeKb: 8, modified: 'Yesterday', modifiedOrder: 1 },
    { id: 'f3', name: 'api.md', size: '15 KB', sizeKb: 15, modified: '3 days ago', modifiedOrder: 3 },
    { id: 'f4', name: 'schema.md', size: '4 KB', sizeKb: 4, modified: 'Last week', modifiedOrder: 7 },
    { id: 'f5', name: 'todo.txt', size: '1 KB', sizeKb: 1, modified: 'Today', modifiedOrder: 0 },
];

type TreeNode = {
    id: string;
    name: string;
    children?: TreeNode[];
};

export function App(): React.JSX.Element {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | undefined>();

    const sortedTableData = useMemo(() => {
        if (!sortDescriptor) {
            return tableData;
        }
        return [...tableData].sort((a, b) => {
            let cmp: number;
            switch (sortDescriptor.column) {
                case 'name':
                    cmp = a.name.localeCompare(b.name);
                    break;
                case 'size':
                    cmp = a.sizeKb - b.sizeKb;
                    break;
                case 'modified':
                    cmp = a.modifiedOrder - b.modifiedOrder;
                    break;
                default:
                    cmp = 0;
            }
            return sortDescriptor.direction === 'descending' ? -cmp : cmp;
        });
    }, [sortDescriptor]);

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
                <Table
                    aria-label="Files"
                    className="app-table"
                    selectionMode="multiple"
                    selectionBehavior="replace"
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader>
                        <Column id="name" isRowHeader allowsSorting>
                            Name
                        </Column>
                        <Column id="size" allowsSorting>
                            Size
                        </Column>
                        <Column id="modified" allowsSorting>
                            Modified
                        </Column>
                    </TableHeader>
                    <TableBody items={sortedTableData}>
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
