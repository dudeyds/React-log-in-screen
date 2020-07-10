const express = require("express")
const bodyParser = require("body-parser");
const fakeUsers = require("./fake-users.json");
const app = express();
const port = 3000;


function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
}

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
    const { username, password } = req.body || {};
    if(!username || !password) {
        res.status(400).send("Bad request");
    } else {
        const user = fakeUsers[username];
        if(!user) {
            res.status(403).send("Login failed");
            console.log("Login failed for unknown user", username);
        } else {
            if(password === user.password) {
                res.status(201).send("Login succeeded");
                console.log("Login succeeded for", username);
            } else {
                res.status(403).send("Login failed");
                console.log("Login failed for known user", username);
            }
        }
    }
});
app.listen(port, () => console.log(`Fake login server listening at http://localhost:${port}`));