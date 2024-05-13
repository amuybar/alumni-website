import React from 'react';
import '../styles/Store.css'
const AlumniMerchandiseStore = () => {
  // Sample data for the merchandise
  const merchandise = [
    {
      id: 1,
      name: 'Alumni T-Shirt',
      description: 'High-quality t-shirt with alumni logo',
      price: 700,
      image: '/tshirt.jpg',
    },
    {
      id: 2,
      name: 'Alumni Hoodie',
      description: 'Warm and cozy hoodie with alumni logo',
      price: 1000,
      image: '/hoddy.jpg',
    },
    {
      id: 3,
      name: 'Alumni Mug',
      description: 'Ceramic mug with alumni logo',
      price: 200,
      image: '/mug.jpg',
    },
  ];

  return (
    <div className="merchandise-store">
      <h1>Alumni Merchandise Store</h1>
      <p>Welcome to the alumni merchandise store! Here you can find a variety of products to show your alumni pride.</p>
      <div className="merchandise-list">
        {merchandise.map((item) => (
          <div className="merchandise-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Ksh: {item.price}</p>
            <button>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlumniMerchandiseStore;