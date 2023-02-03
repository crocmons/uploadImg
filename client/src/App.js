import { useState } from 'react'
// import avatar from './assets/profile.png'
import './App.css'

import axios from 'axios';

// const url = "http://localhost:5000/upload"

function App() {
  
  const [postImage, setPostImage] = useState( { Image : ""})

  const createPost = async (newImage) => {
    try{
      await axios.post("https://imageupload-jilk.onrender.com/upload", newImage)
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
          <img src={postImage.Image} alt="uploadimg" />
        </label>

        <input 
          type="file"
          lable="Image"
          name="Image"
          id='file-upload'
          accept='.jpeg, .png, .jpg'
          onChange={(e) => handleFileUpload(e)}
         />

         <h3>Uploaded Image</h3>
         <span>Successfully uploaded!</span>

         <button type='submit'>Submit</button>
      </form>
 <img src={postImage.Image} alt="uploadimg" />
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
