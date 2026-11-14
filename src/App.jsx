import { useEffect,useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedImageUrl,setUploadedImageurl] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/images");

      if (response.data && response.data.length > 0) {
        setImages(response.data);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to load images");
      }
    };

  fetchImages();
  }, []);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axios.post(
      "http://localhost:4000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setUploadedImageurl(response.data.imageUrl);
    setMessage("Image uploaded successfully");

  } catch (error) {
    console.error(error);
    setMessage("Image Upload failed.");
  }
};

  return (
  <div className="App">
    <div>
      <h2>Image Uploader</h2>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>

    {uploadedImageUrl && (
      <div>
        <h3>Uploaded Image:</h3>
        <img src={uploadedImageUrl} alt="Uploaded Image" />
      </div>
    )}
    <div>
  <h3>All Uploaded Images</h3>

  {images.length > 0 ? (
    images.map((img, index) => (
      <img
        src={img.imageUrl}
        alt={`Image${index}`}
        key={img._id || index}
        style={{
         width: "100px",
         height: "100px",
         margin: "10px",
         objectFit: "cover",
       }}
      />
    ))
  ) : (
    <p>No image found.</p>
  )}
</div>
  </div>
);
}