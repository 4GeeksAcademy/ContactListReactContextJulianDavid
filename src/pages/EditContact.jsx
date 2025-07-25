import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const EditContact = () => {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener los datos actuales del contacto
    useEffect(() => {
        const fetchContact = async () => {
            try {
                // Obtener TODOS los contactos
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/JulianDavid/contacts`);

                if (!response.ok) throw new Error('Error al cargar contactos');

                const data = await response.json();

                // Filtrar el contacto específico
                const foundContact = data.contacts.find(c => c.id == contactId);

                if (!foundContact) throw new Error('Contacto no encontrado');

                setContact(foundContact);
            } catch (error) {
                console.error('Error al cargar contacto:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [contactId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/JulianDavid/contacts/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
            });

            if (!response.ok) throw new Error('Error al actualizar');

            alert('Contacto actualizado correctamente');
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar el contacto');
        }
    };

    if (loading) return <div className="text-center mt-5">Cargando...</div>;
    if (error) return <div className="alert alert-danger mt-5">{error}</div>;

return (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-0 pt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="h3 mb-0">
                <i className="fas fa-user-edit text-primary me-2"></i>
                Edit Contact
              </h2>
              <button 
                className="btn btn-sm btn-outline-secondary" 
                onClick={() => navigate('/')}
              >
                <i className="fas fa-times me-1"></i> Close
              </button>
            </div>
          </div>

          <div className="card-body px-4 py-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="fas fa-user me-2 text-muted"></i>
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="name"
                  value={contact.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="fas fa-envelope me-2 text-muted"></i>
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  name="email"
                  value={contact.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="fas fa-phone me-2 text-muted"></i>
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  name="phone"
                  value={contact.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                  Address
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="address"
                  value={contact.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg"
                  onClick={() => navigate('/')}
                >
                  <i className="fas fa-arrow-left me-2"></i> Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg px-4"
                >
                  <i className="fas fa-save me-2"></i> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};