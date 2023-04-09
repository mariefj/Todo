import express, { Application } from 'express'
import mongoose from 'mongoose'

const app: Application = express()

const dbUrl = 'mongodb://172.17.0.2:27017/todos'
mongoose.connect(dbUrl).then(() => {
	app.listen(3000)
})

export { app }
