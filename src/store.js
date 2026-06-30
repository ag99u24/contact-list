export const initialStore = () => {
  return {
    contacts: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload
      };

    default:
      throw Error("Unknown action.");
  }
}

export const actions = dispatch => ({
  getContacts: async () => {
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
  },

  addContact: async contact => {
    await fetch(`${API}/${AGENDA}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    });

    actions(dispatch).getContacts();
  },

  updateContact: async (id, contact) => {
    await fetch(`${API}/${AGENDA}/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    });

    actions(dispatch).getContacts();
  },

  deleteContact: async id => {
    await fetch(`${API}/${AGENDA}/contacts/${id}`, {
      method: "DELETE"
    });

    actions(dispatch).getContacts();
  }
});