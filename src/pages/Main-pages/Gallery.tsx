import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/GalleryPage.css';
import { baseUrl, imageEndpoints } from '../../Services/apis_endpoin';

const GalleryPage = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(baseUrl + imageEndpoints.getImages);
        setImages(response.data.images);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching images.');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery-page">
      <h1>Alumni Gallery</h1>
      {loading? (
        <p>Loading...</p>
      ) : error? (
        <p>{error}</p>
      ) : images.length === 0? (
        <p>No Images Found</p>
      ) : (
        <div className="image-grid">
          {images.map((image, index) => (
            <div className="image-card" key={index}>
              <img src={image.url} alt={image.description} />
              <div className="image-details">
                <p>{image.description}</p>
                <p>{image.quote}</p>
                <p>{image.location}</p>
                <p>{new Date(image.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;