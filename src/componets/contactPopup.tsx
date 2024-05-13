import React, { useState } from 'react';
import { User } from '../types';
import { AiOutlineWhatsApp, AiOutlinePhone, AiOutlineMail, AiOutlineClose } from 'react-icons/ai';
import '../styles/Popup.css';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose, user }) => {
  const [show, setShow] = useState(isOpen);

  

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <div className='contact-popup'>
      
      {show && (
        <div className="modal">
          <div className="modal-content">
            <h2>Contact {user?.name}</h2>
            <div className="modal-body">
              <a href={`https://wa.me/${user?.phone}`} className="btn-primary"><AiOutlineWhatsApp /><h2>Whatsapp</h2></a>
              <a href={`tel:${user?.phone}`} className="btn-secondary"><AiOutlinePhone /><h2>Call</h2></a>
              <a href={`mailto:${user?.email}`} className="btn-secondary"><AiOutlineMail /><h2>Mail</h2></a>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleClose}><AiOutlineClose /> Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPopup;
