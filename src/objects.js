import { Router } from 'express'
import logger from './logger'

const object = {
  id: '123',
  name: 'My Object'
}

export const objectRouter = new Router({ mergeParams: true})

objectRouter.get('/', (req, res) => {
  const { id } = req.params

  console.log(`Fetching object:${id}`) // <-- this shows up as breadcrumb
  logger.info(`Fetching object:${id}`) // <-- this doesn't

  setTimeout(() => {
    if (id === '123') {
      res.json(object)
    } else {
      res.sendStatus(404)
    }
  }, 1500)
})
