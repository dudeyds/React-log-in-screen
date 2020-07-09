const express = require('express')
const bodyParser = require("body-parser");
const app = express();
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body || {};
    if (username !== "james") {
        res.status(403).send("Login failed");
        console.log("Login failed for", username);
    }
    else {
        res.status(201).send("Login succeeded");
        console.log("Login succeeded for", username);
    }
});

app.listen(port, () => console.log(`Fake login server listening at http://localhost:${port}`));