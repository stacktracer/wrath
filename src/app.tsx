import { Button, Collection, Tree, TreeItem, TreeItemContent } from 'react-aria-components';

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
                    React Aria tree, direct styled, intentionally mostly ugly for evaluation.
                </p>
                <Tree
                    aria-label="Project tree"
                    className="app-tree"
                    defaultExpandedKeys={['workspace', 'notes']}
                    selectionMode="single"
                >
                    <Collection items={treeData}>{item => renderTreeItem(item)}</Collection>
                </Tree>
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
