import React from 'react';
import '../styles/SaccoSection.css';

const SaccoSection = () => {
    return (
        <div className="sacco-section">
            <h1>Alumni Sacco</h1>
            <p className="sacco-description">
               In addition to our alumni association, we also offer a Sacco (Savings and Credit Cooperative Organization) to provide financial services and support to our members. Whether you're looking to save for the future, access affordable loans, or invest in your dreams, our Sacco is here to help you achieve your financial goals.
            </p>
            <button className="join-sacco-btn">Join Alumni Sacco</button>
        </div>
    );
};

export default SaccoSection;
