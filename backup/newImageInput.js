import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AlbumArr } from "./demoData";

function ImagePage() {

  const params = useParams();
  const albumName = params.album;

  const Album = AlbumArr.find((album) => album.name === albumName);

  // const [Album, setAlbum] = useState([]);
  const [ImageName, setImageName] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [ImageURL, setImageURL] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [showImageInput, setShowImageInput] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);

let currentImageIndex;
 const urlRef = useRef();
    // Focus input when it's shown
    useEffect(() => {
      if (showImageInput && urlRef.current) {
        urlRef.current.focus();
      }
    }, [showImageInput]);


      const addImageInput = () => {
        setShowImageInput(!showImageInput);
    
      }
      const clearInput = () => {
        setImageName("");
        setImageURL("");
      }
      const handleDelete= (index) => {
       albumName.photos.splice(index,1)
      }
    
      const handleSub = (e) => {
        e.preventDefault();
        const newImageCreate = {
             description : ImageName ,
            imageURL : ImageURL
        }
        setNewImage(newImageCreate);
        Album.photos.push(newImageCreate);
        console.log(newImage)
        setShowImageInput(false)
    
      }
          
      const handleUpdate = (index) => {
        setShowUpdateInput(true)
currentImageIndex = index;
    setCurrentImage(Album.photos[index])
      
      }
      const handleUpdateSubmit = () => {
        Album.photos[currentImageIndex] ={
          description : ImageName ,
          imageURL : ImageURL
        }
          
          }
    
  return (
    <>
      <h1>hello</h1>
      {showImageInput &&  <form onSubmit={handleSub}>
        <input
          placeholder="Give name for new image"
          ref={urlRef}
          value={ImageName}
          onChange={(e) => setImageName(e.target.value)}
          required>

        </input>
        <input
          placeholder="Give url for new image"
          value={ImageURL}
          onChange={(e) => setImageURL(e.target.value)}
          required>

        </input>
        <button type="button" onClick={clearInput}>Clear</button>
        <button type="submit">Create Image</button>
      </form>
}
{showUpdateInput &&  <form onSubmit={handleUpdateSubmit}>
        <input
          ref={urlRef}
          value={currentImage.description}
          onChange={(e) => setImageName(e.target.value)}
          required>

        </input>
        <input
          placeholder="Give url for new image"
          value={currentImage.imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          required>

        </input>
        <button type="button" onClick={clearInput}>Clear</button>
        <button type="submit">Update Image</button>
      </form>
}
            <h1>Images inside {Album.name}</h1>
      
            <div>
              <button onClick={addImageInput}>{showImageInput || showUpdateInput? "Cancel" : !showImageInput ?"Add Image" : "Update Image"}</button>
            </div>
    
            <div>
              {Album.photos.map((photo , index) => (
             
                  <div key={index}>   
                  <button onClick={(index)=>handleUpdate(index)}></button>
                  <button onClick={(index)=>handleDelete(index)}></button>
                    <img src={photo.imageURL} alt="pic" />
                    <p>   {photo.description}</p>
                  </div>
      
      
      
              ))}
            </div> 
          
    
    </>
  );
}

export default ImagePage;
