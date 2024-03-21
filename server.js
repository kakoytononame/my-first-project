import fs from "fs";
import  http from "http";

const server = http.createServer((req, res) => {
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end("Error reading file.");
            return;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    });
});

/*server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});*/


import express from 'express';
import { TaskModel } from "./taskModel.js";
import mongoose from "mongoose";
import 'dotenv/config';
import { validateTaskData } from './middleware/validateTaskData.js';
const app = express();
app.use(express.json());

mongoose.Promise = global.Promise;
const mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

mongoose.connect(mongoUrl)

const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.send('Hello, Express!');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/tasks', async(req, res) => {
    try{
        const tasks = await TaskModel.find();
        res.json(tasks);
    } catch(err){
        res.status(500).send(err.message)
    }
});

app.post('/tasks', validateTaskData, async (req, res) => {
    try{
        const newTask = new TaskModel(req.body);
        const savedTask = newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).send(err.message);
    }
});


