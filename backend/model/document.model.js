import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    fileName:{
        type: String,
        required: true
    },
    data:{
        type:Object,
        required: true
    },
    text:{
        type:String,
        required:true
    }
})

const Document = mongoose.model('document',documentSchema)
export default Document