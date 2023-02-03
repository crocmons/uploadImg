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
// app.use(express.static("public"));

app.get("/",async (req,res)=>{
    try{
        Image.find({}).then((data)=>{
           res.json(data)
        }).catch((err)=>{
            res.status(429).json(err)
        })
        res.status(200).send("You're in the Home Page")
    }catch(err){
        res.status(500).json(err.message)
    }
})

app.post("/upload",async(req,res)=>{
    const img = req.body;
     try{
        const newImg = await Image.create(img);
        newImg.save();
        res.status(200).send("Image is uploaded!")
     }catch(err){
        res.status(500).json(err);
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