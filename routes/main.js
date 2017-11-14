const express = require("express");
const router = express.Router();

//build the route
//this will be the main route
router.get("/", (req, res)=>{
    
    //express will look automatically in the views folder
    res.render("main");
});


module.exports = router;



