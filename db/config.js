const { default: mongoose } = require("mongoose")
const moongose=require("mongoose")


const dbConnection=async()=>{
    try{    
            // await  mongoose.createConnection(process.env.MONGO_CNN,{});
            // console.log("DB online");
            await moongose.connect(process.env.MONGO_CNN,{
                
            })
            console.log("DB online");
    }
    catch (error){
        console.log("DB connection fail " ,error);
        throw new Error("DB connection fail ");
    }

}
module.exports={
    dbConnection
}