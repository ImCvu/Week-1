// const http = require("http");
// /* let a = ()=>{

// }*/

// http
//   .createServer((req, res) => {
//     res.write("<h1>Welcome to my class</h1>");
//     res.end();
//   })
//   .listen(1234);
//Import packages
const express = require("express");
const morgan = require("morgan");
//APP INIT
const app = express();

//Morgan
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.routes.js"));

//First Route

app.get("/", (req, res) => {
  res.json({ message: "Welcom to the class" });
});
app.listen("5000");
console.log("server started");
