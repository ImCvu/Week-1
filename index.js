// const http = require("http");
// /* let a = ()=>{

// }*/

// http
//   .createServer((req, res) => {
//     res.write("<h1>Welcome to my class</h1>");
//     res.end();
//   })
//   .listen(1234);

const express = require("express");
const morgon = require("morgan");
//APP INIT
const app = express();

//First Route

app.get("/", (req, res) => {
  res.json({ message: "Welcom to the class" });
});
app.listen("1234");
