import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AlbumContext } from "./albumContext";
import "./ImagePage.css"; // Import CSS file

function ImagePage() {
  const params = useParams();
  const albumName = params.album;
  const { albums, addPhotoToAlbum, updatePhoto } = useContext(AlbumContext);
  const Album = albums.find((album) => album.name === albumName);

  const photos = Album.photos;
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [showNewImageInput, setShowNewImageInput] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 State for search input

  const urlRef = useRef();

  useEffect(() => {
    if ((showNewImageInput || showUpdateInput) && urlRef.current) {
      urlRef.current.focus();
    }
  }, [showUpdateInput, showNewImageInput]);

  const toggleImageInput = () => {
    setShowNewImageInput(false);
    setShowUpdateInput(false);
    clearInput();
  };

  const clearInput = () => {
    setImageName("");
    setImageURL("");
  };

  const handleDelete = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    updatePhoto(albumName, updatedPhotos);
  };

  const showAddImage = () => {
    setShowNewImageInput(true);
  };

  const handleSub = (e) => {
    e.preventDefault();

    if (showNewImageInput) {
      const newImage = { description: imageName, imageURL: imageURL };
      addPhotoToAlbum(albumName, newImage);
    }

    if (showUpdateInput) {
      const updatedPhotos = photos.map((photo, i) =>
        i === currentImageIndex ? { description: imageName, imageURL: imageURL } : photo
      );
      updatePhoto(albumName, updatedPhotos);
    }

    setShowNewImageInput(false);
    setShowUpdateInput(false);
    clearInput();
  };

  const handleUpdate = (index) => {
    setShowUpdateInput(true);
    setShowNewImageInput(false);
    setCurrentImageIndex(index);
    setImageName(photos[index].description);
    setImageURL(photos[index].imageURL);
  };

  // 🔹 Filter photos based on the search term
  const filteredPhotos = photos.filter((photo) =>
    photo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="image-page-container">
      <h1 className="album-title">Images inside "{Album.name}"</h1>

      {/* 🔹 Search Box */}
      <input
        type="text"
        placeholder="Search photos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
       className="search-input"
      />

      <div className="button-container">
        {(showNewImageInput || showUpdateInput) && (
          <button onClick={toggleImageInput} className="btn cancel-btn">Cancel</button>
        )}
        {!showNewImageInput && !showUpdateInput && (
          <button onClick={showAddImage} className="btn add-btn">Add Image</button>
        )}
      </div>

      {(showNewImageInput || showUpdateInput) && (
        <form onSubmit={handleSub} className="image-form">
          <input
            placeholder="Image Name"
            ref={urlRef}
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            required
            className="input-field"
          />
          <input
            placeholder="Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            required
            className="input-field"
          />
          <div className="form-buttons">
            <button type="button" onClick={clearInput} className="btn clear-btn">Clear</button>
            <button type="submit" className="btn submit-btn">
              {showNewImageInput ? "Create Image" : "Update Image"}
            </button>
          </div>
        </form>
      )}

      {filteredPhotos.length === 0 ? (
        <h2 className="no-photos-text">No matching photos found</h2>
      ) : (
        <div className="image-grid">
          {filteredPhotos.map((photo, index) => (
            <div key={index} className="image-card">
              <img src={photo.imageURL} alt={photo.description} className="image" />
              <p className="image-description">{photo.description}</p>
              <div className="image-actions">
                <button onClick={() => handleUpdate(index)} className="btn edit-btn">Edit</button>
                <button onClick={() => handleDelete(index)} className="btn delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImagePage;
