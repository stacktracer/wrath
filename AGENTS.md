## Avoid Absolute URL Paths
- Don't generate absolute URL paths
- The app may be served behind a proxy with an unpredictable path prefix
- Use relative asset and resource URLs so the app can be relocated without rebuilding
- Keep client-side routes in the URL fragment (hash routing) rather than path segments
