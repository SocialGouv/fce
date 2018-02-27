const mongoose = require("mongoose");
const config = require("config");

const dbConfig = config.get("mongo.host") + "/" + config.get("mongo.db");
mongoose.connect("mongodb://" + dbConfig);
