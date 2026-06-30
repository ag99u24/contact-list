import React from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ contact, deleteContact }) => {
  return (
    <div className="card mb-3">
      <div className="row g-0 align-items-center">
        <div className="col-md-2 text-center p-3">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt={contact.name}
            className="contact-img"
          />
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h5>{contact.name}</h5>
            <p className="text-muted mb-1">
              <i className="fa-solid fa-location-dot me-2"></i>
              {contact.address}
            </p>
            <p className="text-muted mb-1">
              <i className="fa-solid fa-phone me-2"></i>
              {contact.phone}
            </p>
            <p className="text-muted mb-0">
              <i className="fa-solid fa-envelope me-2"></i>
              {contact.email}
            </p>
          </div>
        </div>

        <div className="col-md-2 text-end pe-4">
          <Link to={`/edit-contact/${contact.id}`} className="btn btn-link text-dark">
            <i className="fa-solid fa-pencil"></i>
          </Link>

          <button
            className="btn btn-link text-dark"
            onClick={() => deleteContact(contact.id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;