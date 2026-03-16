import './main.css';

const app = document.querySelector( '#app' );

if ( !app ) {
    throw new Error( 'Expected #app container in index.html.' );
}

const prefersDarkTheme = window.matchMedia( '(prefers-color-scheme: dark)' );

function syncTheme( ): void {
    document.body.classList.toggle( 'theme-dark', prefersDarkTheme.matches );
}

syncTheme( );
prefersDarkTheme.addEventListener( 'change', syncTheme );

app.replaceChildren(
    createAppShell( ),
);

function createAppShell( ): HTMLElement {
    const shell = document.createElement( 'main' );
    shell.className = 'app-shell';

    const card = document.createElement( 'section' );
    card.className = 'app-card';

    const title = document.createElement( 'h1' );
    title.className = 'app-title';
    title.textContent = 'Wrath';

    const message = document.createElement( 'p' );
    message.className = 'app-copy';
    message.textContent = 'Blueprint and the prototype tree have been removed.';

    card.append( title, message );
    shell.append( card );

    return shell;
}
