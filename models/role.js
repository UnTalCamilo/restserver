const {Schema,model}=require("mongoose");

const roleSchema=Schema({
    role:{
        type:String,
        required:[true,"Role is required"],
        enum:['ADMIN','USER']
    }
});

module.exports=model('Role',roleSchema)