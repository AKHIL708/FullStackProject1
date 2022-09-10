const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/UsersList")
.then(()=>{
    console.log("db connected success")
}).catch((err)=>{
    console.log("db connection unsuccess",err)
    
})