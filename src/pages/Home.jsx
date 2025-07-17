import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditContact } from "./EditContact.jsx";

export const Home = () => {

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  const apiUrlGet = "https://playground.4geeks.com/contact/agendas/JulianDavid"
  const apiUrlDelete = "https://playground.4geeks.com/contact/agendas/JulianDavid/contacts"
  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const response = await fetch(apiUrlGet);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setContacts(data.contacts)
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  const deleteContact = async (contactId) => {
    try {
      await fetch(`${apiUrlDelete}/${contactId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });



      setContacts(contacts.filter(contact => contact.id !== contactId));
    } catch (error) {
      console.error("Error al eliminar: ", error);
      alert("No se pudo eliminar el contacto");
    }
  };

  return (
    <div className="container text-center mt-5">
      <div className="d-flex justify-content-end">
        <Link to="/new-contact">
          <button type="button" className="btn btn-success mb-3">Add new contact</button>
        </Link>
      </div>

      {contacts.map((contact) => (
        <div key={contact.id} className="d-flex justify-content-around border">
          <div className="col mt-3 mb-3">
            <img src="https://picsum.photos/id/237/150/150" className="rounded-circle" alt="contact" />
          </div>
          <div className="col d-flex flex-column justify-content-center align-items-start">
            <h3>{contact.name}</h3>
            <div className="font-serif">
              <i className="fa-solid fa-location-dot"></i>{contact.address}
            </div>
            <div className="font-serif">
              <i className="fa-solid fa-phone-flip"></i> {contact.phone}
            </div>
            <div className="font-serif">
              <i className="fa-solid fa-envelope"></i> {contact.email}
            </div>
          </div>
          <div className="col d-flex justify-content-center ms-5 mt-4">
            <i className="fa-solid fa-pencil align-end mx-5" style={{cursor: "pointer"}} onClick={()=> navigate(`/edit-contact/${contact.id}`)} ></i>
            <i className="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => {
              if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
                deleteContact(contact.id);}}}></i>
          </div>
        </div>
      ))}
    </div>
  );
};