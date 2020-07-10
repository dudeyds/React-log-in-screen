const express = require("express")
const bodyParser = require("body-parser");
const fakeUsers = require("./fake-users.json");
const app = express();
const port = 3000;

function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    console.log(req.headers);
    next();
}

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
        BadRequest(res);
    } else {
        ProcessValidRequest(res, username, password);
    }
});

function ProcessValidRequest(res, username, password) {
    const user = fakeUsers[username];
    if (!user) {
        LoginFailed(res);
        console.log("Login failed for unknown user", username);
    } else {
        ProcessKnownUserLogin(password, user, res, username);
    }
}

function ProcessKnownUserLogin(res, password, user) {
    if (password === user.password) {
        LoginSucceeded(res);
        console.log("Login succeeded for", user.username);
    } else {
        LoginFailed();
        console.log("Login failed for known user", user.username);
    }
}

const LoginSucceeded = res => res.status(201).send("Login succeeded");

const LoginFailed = res => res.status(403).send("Login failed");

const BadRequest = res => res.status(400).send("Bad request");

app.listen(port, () => console.log(`Fake login server listening at http://localhost:${port}`));
