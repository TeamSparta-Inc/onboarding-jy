const express = require("express");
const app = express();
const port = 8000;

app.use(express.static("./src/assets"));

app.get("/", (req, res) =>
    res.send(
       " <div>" +
                "<div>어흥~ 나는 무케라고 해. 혹시 과자있어?</div>" +
                "<img src='tiger.png' alt='mukae'/>" +
             "</div>"
    )
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);