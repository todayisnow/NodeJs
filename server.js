//my modules
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

//my pages
var index = require("./routes/index");
var tasks = require("./routes/tasks");

//my app
var app = express();

//view engine
//our view in the view folder
app.set("views", path.join(__dirname, "views"));
//our engine
app.set("view engine", "ejs");
// to be able to render html by ejs
app.engine("html", require("ejs").renderFile);

//static folder for angluar
app.use(express.static(path.join(__dirname, "client")));

//body parse middleware
//able to parese json
app.use(bodyParser.json());
//
app.use(bodyParser.urlencoded({ extended: false }));
//routes
app.use("/", index);
app.use("/api", tasks);

//listten
var port = 1337;
//func is a call back to be called after connect
app.listen(port,function()
{
    console.log("server started on port" + port);
});