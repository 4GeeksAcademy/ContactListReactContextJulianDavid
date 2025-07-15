import React, { useState } from "react";
import { Link } from "react-router-dom";


export const NewContact = () => {

    const apiUrl = "https://playground.4geeks.com/contact/agendas/JulianDavid/contacts";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

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
        <div className="container">
            <h1 className="text-center">Add a new contact</h1>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label"   >Full name</label>
                <input type="text" className="form-control" id="nameInput" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label" >Email</label>
                <input type="email" className="form-control" id="emailInput" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Phone</label>
                <input type="tel" className="form-control" id="phoneInput" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label" >Address</label>
                <input type="text" className="form-control" id="addressInput" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="d-grid gap-2">
                <button type="button" className="btn btn-primary" onClick={createContact}>Save</button>
            </div >
            <Link to="/">
                or get back to contacts
            </Link>

        </div>
    );
};