import * as Sentry from '@sentry/node'
import http from 'http'

class MyAgent extends http.Agent {
  addRequest(...args) {
    super.addRequest(...args)
    const [req] = args
    const scope = Sentry.getCurrentHub().getScope();
    const { spans } = scope.getSpan().spanRecorder
    const requestSpan = spans[spans.length - 1]
    requestSpan.setTag('http.reused_socket', req.reusedSocket)
    return req
  }
}

const agent = new MyAgent({ keepAlive: true })

export const getExample = async () => {
  const req = http.request('http://example.com', { agent })

  return new Promise(resolve => {
    req.on('response', res => {
      let body = ''
      res.on('data', chunk => (body += chunk))
      res.on('end', () => resolve(body))
    })
    req.end()
  })
}
