import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditContact } from "./EditContact.jsx";

export const Home = () => {

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);


  const apiUrlBase = "https://playground.4geeks.com/contact/agendas";
  const agendaName = "JulianDavid";
  const apiUrlGet = `${apiUrlBase}/${agendaName}`;
  const apiUrlDelete = `${apiUrlBase}/${agendaName}/contacts`;



  const createAgenda = async () =>{
    try{
      const response = await fetch(`${apiUrlBase}/${agendaName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok){
        throw new Error(`Error al crear agenda: ${response.status}`);
      }

      return await response.json()
    }catch (error){
      console.error("Error al crear agenda: ", error);
      throw error;
    }
  };

  const obtenerDatos = async () => {
    try {
      const response = await fetch(apiUrlGet);

      if (!response.ok) {
        if (response.status === 404){
          //si no existe kla agenda se crea
          await createAgenda();
          // se intentan obtener los datos nuevamente 
          return await obtenerDatos();
        }

        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setContacts(data.contacts || [])
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

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

  <div className="container mt-5">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="mb-0">My Contacts</h1>
      <Link to="/new-contact">
        <button type="button" className="btn btn-success">
          <i className="fas fa-plus me-2"></i>Add New Contact
        </button>
      </Link>
    </div>

    {contacts.length === 0 ? (
      <div className="text-center py-5">
        <i className="fas fa-address-book fa-5x text-muted mb-4"></i>
        <h3>No contacts found</h3>
        <p className="text-muted">Start by adding your first contact</p>
      </div>
    ) : (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-white border-0 pt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <img 
                    src={`https://i.pravatar.cc/150?u=${contact.email}`} 
                    className="rounded-circle me-3" 
                    alt="avatar" 
                    width="60" 
                    height="60"
                  />
                  <div>
                    <button 
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => navigate(`/edit-contact/${contact.id}`)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this contact?")) {
                          deleteContact(contact.id);
                        }
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="card-body">
                <h5 className="card-title mb-3">{contact.name}</h5>
                
                <div className="d-flex align-items-start mb-2">
                  <i className="fas fa-envelope text-muted mt-1 me-3"></i>
                  <div>
                    <small className="text-muted">Email</small>
                    <p className="mb-0">{contact.email || '-'}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-2">
                  <i className="fas fa-phone-alt text-muted mt-1 me-3"></i>
                  <div>
                    <small className="text-muted">Phone</small>
                    <p className="mb-0">{contact.phone || '-'}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start">
                  <i className="fas fa-map-marker-alt text-muted mt-1 me-3"></i>
                  <div>
                    <small className="text-muted">Address</small>
                    <p className="mb-0">{contact.address || '-'}</p>
                  </div>
                </div>
              </div>
              
              <div className="card-footer bg-white border-0 pb-3">
                <small className="text-muted">
                  Last updated: {new Date().toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};