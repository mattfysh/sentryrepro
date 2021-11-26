import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import app from './routes'

const { DSN: dsn } = process.env

Sentry.init({
  dsn,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
})
