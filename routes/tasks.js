
// our restful api


var express = require("express");
//useing express router
var router = express.Router();

//db setup on mlab
var mongojs = require("mongojs");
var db = mongojs("mongodb://essam:1234@ds149998.mlab.com:49998/todayisnow_mytasklist", ["tasks"]);

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


//get single task .. 
router.get("/task/:id",
    function (req, res, next) {
        db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    });

//insert new task .. 
router.post("/task",
    function(req, res, next) {
        var task = req.body;
        if (!task.title || (task.isDone + '')) {
            res.status(400);
            res.json({
                "error": "Bad Date"
            });
        } else {
            db.tasks.save(task, function(err, task)
            {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            });
        }
    });



//delete single task .. 
router.delete("/task/:id",
    function (req, res, next) {
        db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    });

//update single task .. 
router.put("/task/:id",
    function (req, res, next) {
        var task = req.body;
        var updateTask = {};
        if (task.isDone) {
            updateTask.isDone = task.isDone;
        }
        if (task.title) {
            updateTask.title = task.title;
        }
        if (!updateTask) {
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        } else {
            db.tasks.update({ _id: mongojs.ObjectId(req.params.id) },updateTask,
                {},function(err, task) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(task);
                });
        }
    });

module.exports = router;