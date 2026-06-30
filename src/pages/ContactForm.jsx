import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const API = "https://playground.4geeks.com/contact/agendas";
const AGENDA = "agenda_alex_contacts";

const ContactForm = () => {
  const { store } = useGlobalReducer();
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
      const foundContact = store.contacts.find(item => item.id === Number(id));

      if (foundContact) {
        setContact({
          name: foundContact.name,
          email: foundContact.email,
          phone: foundContact.phone,
          address: foundContact.address
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = event => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (id) {
      await fetch(`${API}/${AGENDA}/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      });
    } else {
      await fetch(`${API}/${AGENDA}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      });
    }

    navigate("/");
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">
        {id ? "Edit contact" : "Add a new contact"}
      </h1>

      <form onSubmit={handleSubmit}>
        <label className="form-label">Full Name</label>
        <input className="form-control mb-3" name="name" value={contact.name} onChange={handleChange} />

        <label className="form-label">Email</label>
        <input className="form-control mb-3" name="email" value={contact.email} onChange={handleChange} />

        <label className="form-label">Phone</label>
        <input className="form-control mb-3" name="phone" value={contact.phone} onChange={handleChange} />

        <label className="form-label">Address</label>
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



















 