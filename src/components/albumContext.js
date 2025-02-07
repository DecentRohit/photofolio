import { createContext, useState, useEffect } from "react";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import db from "../config/firebase";

export const AlbumContext = createContext();

export const AlbumProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "PhotoFolio"), (snapshot) => {
      const albumsFromDB = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Albums from Firestore:", albumsFromDB);
      setAlbums(albumsFromDB);
    });

    return () => unsub(); // Cleanup the listener when component unmounts
  }, []);

  // Function to add an album to Firestore
  const addAlbum = async (albumName) => {
    if (!albumName.trim()) return;

    const newAlbum = { name: albumName, photos: [] };
    const docRef = doc(collection(db, "PhotoFolio"));

    try {
      await setDoc(docRef, newAlbum);
      console.log("Album added:", newAlbum);
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };

  // Function to add a photo to an album
  const addPhotoToAlbum = async (albumName, photo) => {
    const albumRef = albums.find((album) => album.name === albumName);
    if (!albumRef) return;

    const updatedPhotos = [...albumRef.photos, photo];
    const docRef = doc(db, "PhotoFolio", albumRef.id);

    try {
      await setDoc(docRef, { photos: updatedPhotos }, { merge: true });
      console.log("Photo added:", photo);
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  // Function to update photos in an album
  const updatePhoto = async (albumName, updatedPhotos) => {
    const albumRef = albums.find((album) => album.name === albumName);
    if (!albumRef) return;

    const docRef = doc(db, "PhotoFolio", albumRef.id);

    try {
      await setDoc(docRef, { photos: updatedPhotos }, { merge: true });
      console.log("Photos updated:", updatedPhotos);
    } catch (error) {
      console.error("Error updating photos:", error);
    }
  };

  return (
    <AlbumContext.Provider value={{ albums, addAlbum, addPhotoToAlbum, updatePhoto }}>
      {children}
    </AlbumContext.Provider>
  );
};
