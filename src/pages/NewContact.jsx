import React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";


export const NewContact = () => {

    return (
        <div className="container">
            <h1 className="text-center">Add a new contact</h1>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Full name</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Full name" />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter email" />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Phone</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter phone" />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Address</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter address" />
            </div>
            <Link to="/">
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary">Save</button>
                </div >
            </Link>

        </div>
    );
};