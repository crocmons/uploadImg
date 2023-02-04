import { useState } from 'react'
// import avatar from './assets/profile.png'
import './App.css'

import axios from 'axios';

const url = "https://imageupload-jilk.onrender.com/"
const imageurl = "https://www.shutterstock.com/image-vector/upload-vector-icon-cloud-storage-260nw-584449174.jpg"

function App() {
  
  const [postImage, setPostImage] = useState( { Image : ""})

  const createPost = async (newImage) => {
    try{
      await axios.post(url, newImage)
    }catch(error){
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage)
    console.log("Uploaded")
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setPostImage({ ...postImage, Image : base64 })
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>

        <label htmlFor="file-upload" className='custom-file-upload'>
          <img src={postImage.Image || imageurl  } alt="" />
        </label>

        <input 
          type="file"
          lable="Image"
          name="Image"
          id='file-upload'
          accept='.jpeg, .png, .jpg'
          onChange={(e) => handleFileUpload(e)}
         />

         <h3>Your Image</h3>
         <span>Click Submit to store image on db</span>

         <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App


function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
