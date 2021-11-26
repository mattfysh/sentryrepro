import * as Sentry from '@sentry/node'
import http from 'http'

const agent = new http.Agent({ keepAlive: true })

export const getExample = async () => {
  const req = http.request('http://example.com', { agent })

  Sentry.configureScope(scope => {
    scope.setTag('http.reused_socket', req.reusedSocket)
  })

  return new Promise(resolve => {
    req.on('response', res => {
      let body = ''
      res.on('data', chunk => (body += chunk))
      res.on('end', () => resolve(body))
    })
    req.end()
  })
}
