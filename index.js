const express = require("express");
var cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 10086;

app.use(cors());

app.get("/api", (req, res) => {
  res.send("Welcome to CORS server! 😁");
});
app.get("/candy", (req, res) => {
  res.json({ candy: "bubble-gum" });
});

app.get("/getteaminfolist", async (req, res) => {
  try {
    const response = await axios.get(
      "http://192.168.100.236:10086/getteaminfolist"
    );
    console.log("get team info list", res.json(response.data));
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/getcircleinfo", async (req, res) => {
  try {
    const response = await axios.get(
      "http://192.168.100.236:10086/getcircleinfo"
    );
    console.log("get team info list", res.json(response.data));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/getobservingplayer", async (req, res) => {
  try {
    console.log("get observing player");
    const response = await axios.get(
      "http://192.168.100.236:10086/getobservingplayer"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/gettotalplayerlist", async (req, res) => {
  try {
    console.log("get player info list");
    const response = await axios.get(
      "http://192.168.100.236:10086/gettotalplayerlist"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(PORT, "127.0.0.1", () =>
  console.log(`server running on port ${PORT}`)
);
