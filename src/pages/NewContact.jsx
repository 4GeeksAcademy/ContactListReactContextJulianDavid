import React, { useState } from "react";
import { Link } from "react-router-dom";


export const NewContact = () => {

    const apiUrl = "https://playground.4geeks.com/contact/agendas/JulianDavid/contacts";
    const apiCreateUser = "https://playground.4geeks.com/contact/agendas/JulianDavid/"

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // const isFormValid = name.thim()  && phone.thim() && email.thim() && address.thim();


    const createContact = async () => {

        try {
            const resp = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({                  
                            name: name,
                            phone: phone,
                            email: email,
                            address: address                                        
                }),
            });
            if (resp.ok) {
                console.log("Created");
                setName("");
                setEmail("");
                setPhone("");
                setAddress("");
                alert("Contacto creado")
            }
            else {!resp.ok 
                const errorData = await resp.json(); 
                console.error("Error details:", errorData);
                return;
            }
        } catch (error) {
            console.error("error de red", error.message)
        }  
    }

return (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-sm">
          <div className="card-header bg-white border-bottom-0 pt-4">
            <h1 className="h3 text-center mb-0">Add New Contact</h1>
          </div>
          
          <div className="card-body px-4 py-3">
            <form onSubmit={(e) => { e.preventDefault(); createContact(); }}>
              <div className="mb-4">
                <label htmlFor="nameInput" className="form-label fw-semibold">
                  <i className="fas fa-user me-2 text-primary"></i>
                  Full Name
                </label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="nameInput" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="emailInput" className="form-label fw-semibold">
                  <i className="fas fa-envelope me-2 text-primary"></i>
                  Email Address
                </label>
                <input 
                  type="email" 
                  className="form-control form-control-lg" 
                  id="emailInput" 
                  placeholder="john@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phoneInput" className="form-label fw-semibold">
                  <i className="fas fa-phone me-2 text-primary"></i>
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  className="form-control form-control-lg" 
                  id="phoneInput" 
                  placeholder="+1 (555) 123-4567" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="addressInput" className="form-label fw-semibold">
                  <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                  Address
                </label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="addressInput" 
                  placeholder="123 Main St, City" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              
              <div className="d-grid gap-2 mt-4">
                <button 
                  type="submit" 
                  disabled={!name || !email || !phone || !address} 
                  className="btn btn-primary btn-lg"
                >
                  <i className="fas fa-save me-2"></i>
                  Save Contact
                </button>
              </div>
            </form>
            
            <div className="text-center mt-4">
              <Link to="/" className="text-decoration-none">
                <i className="fas fa-arrow-left me-2"></i>
                Back to Contacts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};