var express = require("express");
//useing express router
var router = express.Router();

//db setup on mlab
var mongojs = require("mongojs");
var db = mongojs("mongodb://essam:1234@ds149998.mlab.com:49998/todayisnow_mytasklist", ["tasks"], { authMechanism: 'ScramSHA1' });

//set route to tasks page "task as a action name inside APi route" .. get request will take request response and next
router.get("/tasks",
    function (req, res, next) {
        db.tasks.find(function(err, tasks) {
            if (err) {
                res.send(err);
            }
            res.json(tasks);
        });
    });
module.exports = router;