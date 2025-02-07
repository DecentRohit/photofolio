import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AlbumContext } from "./albumContext";
import "./Albums.css"; // Import CSS file

function Albums() {
  const { albums, addAlbum } = useContext(AlbumContext);
  const [albumName, setAlbumName] = useState("");
  const [showAlbumInput, setShowAlbumInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const nameRef = useRef();

  useEffect(() => {
    if (showAlbumInput && nameRef.current) {
      nameRef.current.focus();
    }
  }, [showAlbumInput]);

  const addAlbumInput = () => {
    setShowAlbumInput(!showAlbumInput);
  };

  const clearInput = () => {
    setAlbumName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!albumName.trim()) return;

    addAlbum(albumName);
    setAlbumName("");
    setShowAlbumInput(false);
  };

  // Filter albums based on search input
  const filteredAlbums = albums.filter((album) =>
    album.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="albums-container">
      <h1 className="albums-title">Your Albums</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search albums..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="button-container">
        <button onClick={addAlbumInput} className="btn add-btn">
          {showAlbumInput ? "Cancel" : "Add Album"}
        </button>
      </div>

      {showAlbumInput && (
        <form onSubmit={handleSubmit} className="album-form">
          <input
            placeholder="Enter album name"
            ref={nameRef}
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            required
            className="album-input"
          />
          <div className="form-buttons">
            <button type="button" onClick={clearInput} className="btn clear-btn">
              Clear
            </button>
            <button type="submit" className="btn submit-btn">
              Create Album
            </button>
          </div>
        </form>
      )}

      <div className="albums-grid">
        {filteredAlbums.length > 0 ? (
          filteredAlbums.map((album, index) => (
            <Link to={`/${album.name}`} key={index} className="album-card">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2590/2590735.png"
                alt="album"
                className="album-img"
              />
              <p className="album-name">{album.name}</p>
            </Link>
          ))
        ) : (
          <p className="no-results">No matching albums found.</p>
        )}
      </div>
    </div>
  );
}

export default Albums;
