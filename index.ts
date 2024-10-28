import ExpressHandlebars from "express-handlebars"
import path from "path"
const express = require('express')
const app = express()
const port = 3000
app.engine("hbs", ExpressHandlebars.engine({extname:".hbs", defaultLayout:"main", layoutsDir:path.join(__dirname,"views/layouts")}))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.get('/', (req, res) => {
  res.render("index", {
    name: "Unge Strandman"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})