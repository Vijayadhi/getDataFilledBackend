import express from "express";
import routes from "./src/routes/index.js"
import cors from "cors";

const app = express();

const PORT = 8000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(PORT, () => console.log(`PORT is listening on ${PORT}`))
