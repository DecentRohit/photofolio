import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Albums from './components/AlbumPage';
import Navbar from './components/Navbar';
import ImagePage from "./components/newImageInput";
import { AlbumProvider } from "../src/components/albumContext"; // Import Context Provider
import NotFound from "./components/NotFound";



function App() {



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />, // Layout wraps Navbar
      errorElement : <NotFound/> ,
      children: [
        {
          index: true,
          element: <Albums />,
        },
        {
          path: ":album", children:[{
           index:true ,  element: <ImagePage />,
          }]
      
        },
      ],
    },

  ]);
  return (
    <>
       <AlbumProvider> 
      <RouterProvider router={router} />
    </AlbumProvider>
    </>
  );
}

export default App;