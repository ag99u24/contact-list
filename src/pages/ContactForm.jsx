import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const ContactForm = () => {
  const { contacts, addContact, updateContact } = useStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (id) {
      const foundContact = contacts.find(item => item.id === Number(id));
      if (foundContact) setContact(foundContact);
    }
  }, [id, contacts]);

  const handleChange = event => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (id) updateContact(id, contact);
    else addContact(contact);

    navigate("/");
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">
        {id ? "Edit contact" : "Add a new contact"}
      </h1>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input className="form-control mb-3" name="name" value={contact.name} onChange={handleChange} />

        <label>Email</label>
        <input className="form-control mb-3" name="email" value={contact.email} onChange={handleChange} />

        <label>Phone</label>
        <input className="form-control mb-3" name="phone" value={contact.phone} onChange={handleChange} />

        <label>Address</label>
        <input className="form-control mb-3" name="address" value={contact.address} onChange={handleChange} />

        <button className="btn btn-primary w-100">Save</button>
      </form>

      <Link to="/" className="d-inline-block mt-3">
        or get back to contacts
      </Link>
    </div>
  );
};

export default ContactForm;




























 