import express, { Application } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'

import { todoRouter } from './todo'
import { logger } from './core/logger'

const dbUrl = 'mongodb://172.17.0.2:27017/todos'
const port = 3000

const app: Application = express()

app.use(bodyParser.json())
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms', {
		stream: { write: msg => logger.http(msg) },
	})
)

app.use('/todos', todoRouter)

mongoose
	.connect(dbUrl)
	.then(() => {
		app.listen(port, () => {
			logger.info(`server started listening on port: ${port}`)
		})
	})
	.catch(e => logger.error(`mongoose failed to connect with: ${e.message}`))

export { app }
