const express = require("express");
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type,Accept,Authorization"
  );
  if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
  }
  next();
});

app.use(express.static("public"));
const {router} = require("./route");

app.use("/api/v1",router);
// app.use("/api/",()=>{ res.send("test");});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
        error: {
              message: error.message
        }
  });
});

let port = 8000 || 8000;
app.listen(port, () => {
  console.log("Server is running...");
});


