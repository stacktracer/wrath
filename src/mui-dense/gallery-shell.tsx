import type { CSSProperties, ReactNode } from 'react';
import { FormControlLabel, Paper, Stack, Switch, Typography } from '@mui/material';

import type { GalleryAdvancedControlDefinition } from './gallery-density';

export function Section({
    children,
    description,
    id,
    title,
}: {
    children: ReactNode;
    description: string;
    id: string;
    title: string;
}) {
    return (
        <section className="mui-dense-section" id={id}>
            <div className="mui-dense-section__heading">
                <Typography component="h2" variant="h4">
                    {title}
                </Typography>
                <Typography color="textSecondary">{description}</Typography>
            </div>
            <div className="mui-dense-gallery">{children}</div>
        </section>
    );
}

export function DemoCard({
    children,
    components,
    fixedWidth,
    maxWidth,
    minWidth,
    title,
    wide = false,
}: {
    children: ReactNode;
    components?: string;
    fixedWidth?: number;
    maxWidth?: number;
    minWidth?: number;
    title: string;
    wide?: boolean;
}) {
    const style =
        fixedWidth === undefined && maxWidth === undefined && minWidth === undefined
            ? undefined
            : ({
                  ...(fixedWidth === undefined
                      ? undefined
                      : { '--mui-dense-demo-fixed-width': `${fixedWidth}px` }),
                  ...(maxWidth === undefined ? undefined : { '--mui-dense-demo-max-width': `${maxWidth}px` }),
                  ...(minWidth === undefined ? undefined : { '--mui-dense-demo-min-width': `${minWidth}px` }),
              } as CSSProperties);

    const className = [
        'mui-dense-demo',
        wide ? 'mui-dense-demo--wide' : null,
        fixedWidth === undefined ? null : 'mui-dense-demo--fixed',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <article className={className} style={style}>
            <div className="mui-dense-demo__header">
                <Typography component="h3" variant="h6">
                    {title}
                </Typography>
                {components ? (
                    <Typography color="textSecondary" variant="body2">
                        {components}
                    </Typography>
                ) : null}
            </div>
            <div className="mui-dense-demo__body">{children}</div>
        </article>
    );
}

export function DensityControlCard({
    children,
    description,
    title,
}: {
    children: ReactNode;
    description: string;
    title: string;
}) {
    return (
        <Paper className="mui-dense-density-card" variant="outlined">
            <Stack spacing={1}>
                <div className="mui-dense-density-card__copy">
                    <Typography variant="subtitle2">{title}</Typography>
                    <Typography color="textSecondary" variant="body2">
                        {description}
                    </Typography>
                </div>
                {children}
            </Stack>
        </Paper>
    );
}

export function AdvancedControlTile({
    checked,
    definition,
    onChange,
}: {
    checked: boolean;
    definition: GalleryAdvancedControlDefinition;
    onChange: (nextValue: boolean) => void;
}) {
    return (
        <Paper className="mui-dense-advanced-card" variant="outlined">
            <Stack spacing={1}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            inputProps={{ 'aria-label': definition.label }}
                            onChange={event => {
                                onChange(event.target.checked);
                            }}
                        />
                    }
                    label={definition.label}
                />
                <Typography color="textSecondary" variant="caption">
                    {definition.mechanism}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {definition.description}
                </Typography>
            </Stack>
        </Paper>
    );
}
