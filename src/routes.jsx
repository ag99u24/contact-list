import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import ContactList from "./pages/ContactList.jsx";
import ContactForm from "./pages/ContactForm.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<ContactList />} />
      <Route path="/add-contact" element={<ContactForm />} />
      <Route path="/edit-contact/:id" element={<ContactForm />} />
    </Route>
  )
);