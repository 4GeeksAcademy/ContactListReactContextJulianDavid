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
        <div className="container mt-5">
            <h2>Editar Contacto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="name" value={contact.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={contact.email} onChange={handleChange} required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="tel" className="form-control" name="phone" value={contact.phone} onChange={handleChange} required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="address" value={contact.address} onChange={handleChange} required/>
                </div>

                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Cancelar</button>
            </form>
        </div>
    );
};