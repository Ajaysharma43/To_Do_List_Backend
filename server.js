const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const ejs = require("ejs");
const data = require("./Mongodb_Schema/User_Schema");

const app = express();

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json())

mongoose.set("strictQuery", true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/Users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.error("Connection error:", err));

app.post("/AddToDo", async (req, res) => {
  const todo = req.body.todo;
  const task = req.body.task;

  const dataset = { TaskName: todo, Task: task };

  const newData = new data(dataset);

  const result = await newData.save(); 

  res.send("success");
});

app.post('/DeleteToDo', async (req,res)=>{
    const id = req.body.id;
    const deletedata = await data.deleteOne({_id:id})
    res.send("success");
})

app.post("/UpdateToDo",async (req,res)=> {
    const UpdateTask = req.body.UpdateTask;
    const UpdateTaskName = req.body.UpdateTaskname
    const id = req.body.id;
    const updatedata = await data.updateOne({_id:id},{$set:{TaskName:UpdateTaskName,Task:UpdateTask}})
    console.log(updatedata);
    res.send("updated")
})

app.get('/GetToDO',async(req,res)=>{
    const todo = await data.find();
    res.send(todo)
});

app.listen(3000);
