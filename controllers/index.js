// Imports
const router = require("express").Router();//This imports the Router module from the express.js framework
const apiRoutes = require("./api");//This imports a ser of routes from a file or directory
const homeRoutes = require("./homeRoutes");

// Middleware
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

// Exports
module.exports = router;//This allows me to the router to be exported so it can be used in other parts of my application