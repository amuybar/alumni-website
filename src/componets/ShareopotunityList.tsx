// OpportunityList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OpportunityType } from '../types';

const OpportunityList = () => {
  const [opportunities, setOpportunities] = useState<OpportunityType[]>([]);

  useEffect(() => {
    // Fetch opportunities from the backend upon component mount
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get('/api/opportunities');
        setOpportunities(response.data);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };
    fetchOpportunities();
  }, []);

  return (
    <div>
      <h2>Opportunities</h2>
      <ul className='opportunity-card'>
        {opportunities.map((opportunity) => (
          <li key={opportunity.id}>
            <h3 className='opportunity-title'>{opportunity.title}</h3>
            <p className='opportunity-description'>{opportunity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpportunityList;
