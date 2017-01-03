var express = require("express");
//useing express router
var router = express.Router();

//set route to home page .. get request will take request response and next
router.get('/',
    function(req, res, next) {
        res.render("index.html");
    });
module.exports = router;