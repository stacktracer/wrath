export function renderApp(container: ParentNode): HTMLElement {
    const shell = createAppShell();
    container.replaceChildren(shell);
    return shell;
}

export function createAppShell(): HTMLElement {
    const shell = document.createElement('main');
    shell.className = 'app-shell';

    const card = document.createElement('section');
    card.className = 'app-card';

    const title = document.createElement('h1');
    title.className = 'app-title';
    title.textContent = 'Wrath';

    const message = document.createElement('p');
    message.className = 'app-copy';
    message.textContent = 'Blueprint and the prototype tree have been removed.';

    card.append(title, message);
    shell.append(card);

    return shell;
}
