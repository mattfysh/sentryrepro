import './sentry' // MUST BE FIRST
import app from './routes'

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Sentry repro listening at: http://localhost:${port}`)
})
