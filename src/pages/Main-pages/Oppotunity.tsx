// OpportunitiesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import OpportunityList from '../../componets/ShareopotunityList';
import '../../styles/OpportunitiesPage.css';


const OpportunitiesPage = () => {
  return (
    <div className='container'>
      <h1>Opportunities</h1>
      <div className='link-button '>
        <Link to="/share-opportunity">Share an Opportunity</Link>
      </div>
      <hr />
      <OpportunityList />
    </div>
  );
};

export default OpportunitiesPage;
