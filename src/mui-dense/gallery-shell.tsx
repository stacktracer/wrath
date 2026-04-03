import type { ReactNode } from 'react';
import { FormControlLabel, Paper, Stack, Switch, Typography } from '@mui/material';

import type { AdvancedControlDefinition } from './density-controls';

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
    title,
    wide = false,
}: {
    children: ReactNode;
    components: string;
    title: string;
    wide?: boolean;
}) {
    return (
        <article className={wide ? 'mui-dense-demo mui-dense-demo--wide' : 'mui-dense-demo'}>
            <div className="mui-dense-demo__header">
                <Typography component="h3" variant="h6">
                    {title}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {components}
                </Typography>
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
    definition: AdvancedControlDefinition;
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
