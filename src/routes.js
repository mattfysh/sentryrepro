import * as Sentry from '@sentry/node'
import express from 'express'
import { objectRouter } from './objects'
import { getExample } from './request'
import { spawnExampleTask } from './spawn'

const app = express()

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.get('/', (req, res) => {
  setTimeout(() => {
    res.json({ ok: true })
  }, 1200)
})

// transaction name appears un-parameterized
// i.e. "/objects/123" instead of "/objects:id"
app.use('/objects/:id', objectRouter)

app.get('/example', async (req, res) => {
  Sentry.configureScope(scope => {
    scope.setTag('is.express', true)
  })
  const body = await getExample()
  res.send(body)
  setTimeout(spawnExampleTask, 0)
})

app.use(Sentry.Handlers.errorHandler())

export default app
