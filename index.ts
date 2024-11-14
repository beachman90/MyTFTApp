import * as dotenv from 'dotenv'
dotenv.config()

console.log('API Key exists:', !!process.env.RIOT_API_KEY)

import express, { type Request, type Response } from 'express'
import ExpressHandlebars from "express-handlebars"
import path from "path"
import { getTFTPlayerData, router as tftRouter } from './routes/tft';

console.log('Loaded API Key:', `"${process.env.RIOT_API_KEY}"`)

const app = express()
const port = 3001
const riotApiKey = process.env.RIOT_API_KEY
if (!riotApiKey) {
  throw new Error('RIOT_API_KEY is not defined in environment variables');
}

app.engine("hbs", ExpressHandlebars.engine({
  extname: ".hbs", 
  defaultLayout: "main", 
  layoutsDir: path.join(__dirname, "views/layouts")
}))

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))

app.get('/', (req: Request, res: Response) => {
  res.render("index", {
    name: "Strandman"
  })
})

app.get('/summoner/:name/:tag', async (req: Request<{name: string, tag: string}>, res: Response) => {
  try {
    const { name, tag } = req.params;
    const data = await getTFTPlayerData(name, tag, riotApiKey);
    res.render('summoner', data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Full error:', error);
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
})

app.use('/tft', tftRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




