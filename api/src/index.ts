import express, { Application } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import { todoRouter } from './todo'

const dbUrl = 'mongodb://172.17.0.2:27017/todos'

const app: Application = express()
app.use(bodyParser.json())

app.use('/todos', todoRouter)

mongoose.connect(dbUrl).then(() => {
	app.listen(3000)
})

export { app }
