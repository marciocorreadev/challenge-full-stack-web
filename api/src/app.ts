import express from 'express'
import 'express-async-errors'
import routes from '@routes'
import ErrorMiddleware from '@errors/index'
import {pagination} from 'typeorm-pagination'

const app = express()

app.use(express.json())
app.use(routes)
app.use(ErrorMiddleware)
app.use(pagination); 

export default app