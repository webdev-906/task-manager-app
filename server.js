//dependencies required for the to do app
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render files
app.use(express.static("public"));



let task = [];

//placeholders for removed task
let complete = [];

//post route for adding new task 
app.post("/addtask", function(req, res) {
    let newTask = req.body.newtask;
    if (newTask === ""){
        console.log('You did not type in anything')
    }
    else {
        task.push(newTask);
        res.redirect("/"); 
    }
    //add the new task from the post route
    // task.push(newTask);
    // res.redirect("/");
});

app.post("/removetask", function(req, res) {
    let completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    res.render("../index", { task: task, complete: complete });
});

//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});