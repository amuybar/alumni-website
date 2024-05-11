import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Event, User } from '../../types';
import '../../styles/EventForm.css';
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from 'react-router-dom';
import { baseUrl, eventEndpoints, userEndpoints } from '../../Services/apis_endpoin';

const AddEventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Event>>({});

 

 const token = localStorage.getItem('token'); 

 

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
     
      
      await axios.post(baseUrl + eventEndpoints.createEvent, {
        title,
        description,
        location,
        date,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setTitle('');
      setDescription('');
      setLocation('');
      setDate('');
    } catch (error) {
      setErrors({ title: 'An error occurred while adding the event.' });
      setIsLoading(false);
    }
  };

  return (
    <div className="add-event-form">
      <h1>Add Event</h1>
      {errors.title && <p>{errors.title}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {
          !token ?
          <>
          <button onClick={()=>navigate('/login')}>LogIn
        </button>
          </>
          :
          <>
          <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding Event...' : 'Add Event'}
        </button>
          </>
        }
      </form>
    </div>
  );
};

export default AddEventForm;
