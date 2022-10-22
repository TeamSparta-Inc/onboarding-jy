const express    = require("express");
const controller = require("../controllers");
const routes     = express.Router();

routes.route("/").get(controller.getText);
routes.route("/").post(controller.postText);

module.exports = routes;