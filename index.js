const express = require("express");
const app = express();
const port = 8000;
const db=require("./config/mongoose");


// used to extarct jason data from req
app.use(express.json());
app.use(express.urlencoded());


app.use("/",require("./routes"));

app.listen(port,function(err){
    if(err) console.log(`error in starting server: ${err}`);
    console.log(`server is running on port: ${port}`)
})
