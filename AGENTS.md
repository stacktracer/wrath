## Avoid Absolute URL Paths

- Don't generate absolute URL paths
- The app may be served behind a proxy with an unpredictable path prefix
- Use relative asset and resource URLs so the app can be relocated without rebuilding
- Keep client-side routes in the URL fragment (hash routing) rather than path segments

## Verify After Edits

- After modifying files, run `npm run format` and `npm run lint` before considering the task complete
- Resolve linter errors if you can; otherwise stop and ask the user what to do
