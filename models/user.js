const {Schema,model}=require("mongoose")

const userSchema=Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    pwd:{
        type:String,
        required:[true,"Password is required"]
    },
    status:{
        type:Boolean,
        required:false
    },
    role:{
        type:String,
        required:[true,"Role is required"],
        enum:['ADMIN','USER']
    },
    google:{
        type:Boolean,
        default:false
    },
})

userSchema.methods.toJSON=function(){
    const {__v,pwd,...user}=this.toObject()
    return user // Save all the user data except the password
};

module.exports=model('User',userSchema)