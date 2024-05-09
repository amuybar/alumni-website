import React, { useState } from 'react';
import '../styles/JoinSacco.css';
import axios from 'axios';

const JoinSacco = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idno,setIdno]=useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!name ||!email ||!phoneNumber ||!idno) {
      setErrorMessage('Please fill in all the fields');
      return;
    }
    try {
      const response = await axios.post('/api/join-sacco', { name,idno, email, phoneNumber });
      setSuccessMessage(response.data.message);
      setName('');
      setIdno('');
      setEmail('');
      setPhoneNumber('');
    } catch (error) {
      if (!error) {
        setErrorMessage('Something went wrong. Please try again later.');
      } else {
        setErrorMessage(`${error}`);
      }
    }
  };

  return (
    <div className="join-sacco">
      <h1>Join Our COTERIE Sacco</h1>
      <p>Our mission is to provide financial services to our alumni and help them achieve their financial goals.</p>
      <p>Our vision is to be the leading alumni sacco in the country, providing excellent financial services to our members.</p>
      <h2>Advantages of Joining</h2>
      <ul>
        <li>Access to low-interest loans</li>
        <li>Dividends on shares</li>
        <li>Financial advice and education</li>
        <li>Networking opportunities</li>
      </ul>
      <h2>Apply to Join</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
         <input
          type="text"
          placeholder="Your ID"
          value={idno}
          onChange={(e) => setIdno(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Your Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">Apply</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default JoinSacco;