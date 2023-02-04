import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors"
import mongoose from "mongoose";
import Image from "./model/Image.js";


dotenv.config();
const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(express.static("public"));

app.get('/', (req, res) => {
    try{
        Image.find({}).then(data => {
            res.json(data)
        }).catch(error => {
            res.status(408).json({ error })
        })
    }catch(error){
        res.json({error})
    }
})

/** POST: http://localhost:8080/uploads  */
app.post("/", async (req, res) => {
    const body = req.body;
    try{
        const newImage = await Image.create(body);
        newImage.save();
        res.status(200).send("New image uploaded...!")
    }catch(error){
        res.status(409).json({ message : error.message })
    }
})
// mongoose setup
const PORT = process.env.PORT ;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server running")
    })})
    .catch((err)=>
    console.log(err)
)
