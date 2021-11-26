# sentry js issues

1. Using an Express.Router: transaction names contain concrete parameters, e.g. `/objects/123` instead of `/objects/:id`

2. Pino logs not appearing as breadcrumbs, but `console.log` calls are

3. Nested transactions via `spawnExampleTask`
  * Tags from first task are inherited (`is.express=true`)
  * Http span is missing from trace of nested transaction
  * How to disconnect the 2 transactions (tags, spans, etc) but still link them in the UI?
