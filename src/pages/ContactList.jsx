import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard.jsx";
import { useStore } from "../store.js";

const ContactList = () => {
  const { contacts } = useStore();

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-contact" className="btn btn-success">
          Add new contact
        </Link>
      </div>

      {contacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;