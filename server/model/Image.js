import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    Image:String,
    
},
{ timestamps: true }
)

const Image = mongoose.model("Image",ImageSchema);

export default Image;