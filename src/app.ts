import express from "express";
import routes from "./routes";
import helmet from "helmet";
import cors from "cors";


const app = express()
const port = 4000

app.use(cors())
app.use(helmet())
app.use(express.json()) // global middleware

routes(app)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

