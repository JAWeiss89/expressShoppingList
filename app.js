const express = require("express");
const app = express();
const itemsRoutes = require("./routes")
const ExpressError = require("./expressError")

app.use(express.json())
app.use("/items", itemsRoutes)

// If at this point, how route has beeen matched, throw 404 error.
app.use(function (req, res, next) {
    return new ExpressError("Page Not Found. :(", 404);
});

// Any error thrown during any route will be handled here
app.use( function(err, req, res, next) {
    res.status(err.status || 500); // if error did not have error code, show 500
    return res.json({
        error: err.message
    });
});

module.exports = app;