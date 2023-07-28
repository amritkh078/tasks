"use strict";

const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/enquiry", (req, res) => {
    console.log("START");
    console.log("HEADERS", req.headers);
    console.log("END");
    res.send("OK");
});

app.post("/enquiry", (req, res) => {
    console.log("START");
    console.log("INPUT VALUES", req.body.inputValues);
    console.log("HEADERS", req.headers);
    console.log("END");
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
})