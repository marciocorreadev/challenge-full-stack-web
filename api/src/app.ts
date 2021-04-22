import express from 'express'
import 'express-async-errors'
import routes from '@routes'
import ErrorMiddleware from '@errors/index'

const app = express()

app.use(express.json())
app.use(routes)
app.use(ErrorMiddleware)

export default app