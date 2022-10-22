const express = require("express");
const bodyParser = require('body-parser');
const routes = require("./routes");
const path = require("path");
const mongoose = require('mongoose');


const app = express();
const port = 8000;

const MONGO_URL = process.env.ENV === "local" ? "host.docker.internal" : "localhost"

mongoose.connect(`mongodb://${MONGO_URL}:27017/dbsantoryu`, {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(e => {
    console.error('MongoDB connection fail', e);
  });

const start = () => {

    return app.use(express.static("src/assets"))
        .get('/', (req, res) => {
            const filePath = path.join(__dirname, '../assets', 'welcome.html');
            console.log("filePath", filePath)
            res.sendFile(filePath);
        })
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: false }))
        // .use(routes).use(routes.allowedMethods())
        .use("/api", routes)
        .listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

module.exports = {
    start
};
