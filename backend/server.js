const express = require("express");
const fs = require('fs');
const path=require("path")
const cors=require("cors");
const spawn = require("child_process").spawn;

const app = express();
const files = [];
const dataFolder = "../data/"
const outputFolder = "./output/"
const corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.listen(8000, () => {
    console.log("Server Started!");
    fs.readdirSync(dataFolder).forEach(file => {
        files.push(file);
    });
})

app.route("/api/files").get((req, res) => {
    res.send(files);
});

app.route("/api/:file").get((req, res) => {
    const newfile= req.params["file"];
    const srcFileExists = checkExists(dataFolder, newfile, null)
    //const resultExists = checkExists(outputFolder, cleanName(newfile), null)
    if (srcFileExists){
        const pythonProcess = spawn('python',["./extract_data.py", newfile]);
        pythonProcess.stdout.on('data', (data) => {
            res.status(200).send(data);
        });
    } else {
        res.sendStatus(404);
    }
});

// app.route("/api/:file/:postfix").get((req, res) => {
//     const newfile = req.params["file"];
//     const postfix = "-"+req.params["postfix"]+".html";
//     let exists = checkExists(outputFolder, cleanName(newfile), postfix);
//     if (exists) {
//         console.log(outputFolder + exists);
//         res.sendFile(path.join(__dirname, outputFolder+exists));
//     } else {
//         res.sendStatus(404);
//     }

// })

// function cleanName(filename) {
//     name = filename.split(".");
//     return name.slice(0,name.length - 1).join(".");
// }

function checkExists(folder, newfile, postfix) {
    let exists = null;
    console.log("search criteria"+ newfile+postfix)
    fs.readdirSync(folder).forEach(file => {
        if (postfix) {
            if (file === newfile+postfix) {
                console.log("The file exists" + file);
                exists = file;
            }
        } else {
            if (file.startsWith(newfile)) {
                console.log("The file exists" + file);
                exists = file;
            }
        }
    });
    return exists
}