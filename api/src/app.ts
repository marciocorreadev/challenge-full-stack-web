import express from 'express'
import 'express-async-errors'
import routes from '@routes'
import ErrorMiddleware from '@errors/index'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use(ErrorMiddleware)

export default app