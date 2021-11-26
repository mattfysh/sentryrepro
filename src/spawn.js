import * as Sentry from '@sentry/node'
import { getExample } from './request'

export const spawnExampleTask = async () => {
  const transaction = Sentry.startTransaction({
    op: 'spawned_example',
    name: 'Spawned Task: Get Example'
  })
  await getExample()
  transaction.finish()
}
