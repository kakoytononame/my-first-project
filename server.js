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
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
