const express = require("express");
const fs = require('fs');
const path=require("path")
const cors=require("cors");
const spawn = require("child_process").spawn;

const app = express();

const dataFolder = "./data/"
const corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.listen(8000, () => {
    console.log("Server Started!");
})

app.route("/api/files").get((req, res) => {
    const files = [];
    fs.readdirSync(dataFolder).forEach(file => {
        if (!file.endsWith("json")){
            files.push(file);
        }
    });
    res.send(files);
});

app.route("/api/bindings").get((req, res) => {
    const obj = JSON.parse(fs.readFileSync("data_configuration.json", 'utf8'));
    const returnList = []
    for (k of Object.keys(obj)){
        returnList.push({"id": k, "excel": obj[k]["excel"], "py": obj[k]["py"], "actions": "delete"});
    }
    res.send(returnList);
})

app.route("/api/bindings/:id").post((req, res) => {
    const id = req.params["id"]
    const excel = req.query.excel;
    const py = req.query.py;
    console.log(id,excel,py)
    const obj = JSON.parse(fs.readFileSync("data_configuration.json", 'utf8'));
    obj[id] = {};
    obj[id]["excel"] = excel;
    obj[id]["py"] = py;
    fs.writeFileSync("data_configuration.json", JSON.stringify(obj));
    res.send({status: "success"});
})

app.route("/api/bindings/:id").delete((req, res) => {
    const id = req.params["id"]
    const obj = JSON.parse(fs.readFileSync("data_configuration.json", 'utf8'));
    delete obj[id];
    fs.writeFileSync("data_configuration.json", JSON.stringify(obj));
    res.send({status:"success"});
})

app.route("/api/:file").get((req, res) => {
    const newfile= req.params["file"];
    const srcFileExists = checkExists(dataFolder, newfile, null)
    const obj = JSON.parse(fs.readFileSync("data_configuration.json", 'utf8'));
    let referencePY = "";
    for (o of Object.keys(obj)) {
        if (obj[o]["excel"] == newfile) {
            referencePY = obj[o]["py"];
            break;
        }
    }
    console.log("this is a ref", referencePY, srcFileExists, newfile)
    if (srcFileExists && referencePY){
        const cmd = path.join("scripts",referencePY);
        console.log(cmd)
        const pythonProcess = spawn('python',[path.join("./scripts",referencePY), newfile]);
        pythonProcess.stdout.on('data', (data) => {
            res.status(200).send(data);
        });
    } else {
        res.sendStatus(404);
    }
});

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