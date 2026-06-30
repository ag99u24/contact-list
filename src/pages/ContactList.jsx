import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const API = "https://playground.4geeks.com/contact/agendas";
const AGENDA = "agenda_alex_contacts";

const ContactList = () => {
  const { store, dispatch } = useGlobalReducer();

  const getContacts = async () => {
    let response = await fetch(`${API}/${AGENDA}/contacts`);

    if (response.status === 404) {
      await fetch(`${API}/${AGENDA}`, { method: "POST" });
      response = await fetch(`${API}/${AGENDA}/contacts`);
    }

    const data = await response.json();

    dispatch({
      type: "set_contacts",
      payload: data.contacts || []
    });
  };

  const deleteContact = async id => {
    await fetch(`${API}/${AGENDA}/contacts/${id}`, {
      method: "DELETE"
    });

    getContacts();
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-contact" className="btn btn-success">
          Add new contact
        </Link>
      </div>

      {store.contacts.map(contact => (
        <ContactCard
          key={contact.id}
          contact={contact}
          deleteContact={deleteContact}
        />
      ))}
    </div>
  );
};

export default ContactList;