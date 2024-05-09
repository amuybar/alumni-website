// ShareOpportunityForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/OpportunitiesPage.css'

const ShareOpportunityForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      // Send opportunity data to the backend
      await axios.post('/api/opportunities', {
        title,
        description,
      });
      // Clear form fields after successful submission
      setTitle('');
      setDescription('');
      alert('Opportunity shared successfully!');
    } catch (error) {
      console.error('Error sharing opportunity:', error);
      alert('An error occurred while sharing the opportunity.');
    }
  };

  return (
    <div className='form-container'>
      <h2>Share an Opportunity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='form-label'>Title:</label>
          <input className='form-input'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='form-label'>Description:</label>
          <textarea className='form-textarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button className='btn-primary ' type="submit">Share Opportunity</button>
      </form>
    </div>
  );
};

export default ShareOpportunityForm;
