import express from "express"
import cors from "cors"
import helmet from "helmet"
import { errorHandler } from "./middleware/error"
import { mountRoutes } from "./routes"

const app = express()

app.disable("x-powered-by")
app.use(helmet())
app.use(cors())

mountRoutes(app)

// error handling middleware should come last
// ref: https://expressjs.com/en/guide/error-handling.html
app.use(errorHandler)

export default app
