const mongoose=require("mongoose")

const ResumeSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
},

    filename:{
        type:String,
        required:[true,"Filename is required"]
},
    fileurl:{
        type:String,
        required:[true,"File URL is required"]
},
    filetype:{
        type:String,
        required:[true,"File type is required"],
        enum:["pdf","docx"]
},

    extractedtext:{
        type:String,
        required:true
}

},{timestamps:true})

module.exports=mongoose.model("Resume",ResumeSchema)