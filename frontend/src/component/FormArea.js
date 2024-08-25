import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FormArea({ user, onUpdate }) {
    const [formData, setFormData] = useState({
        name: '',
        fathername: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // e.preventDefault();

        if (user && user._id) {
            // Update existing user
            axios.put(`http://localhost:3000/user/isUpdate/${user._id}`, formData)
                .then(response => {
                    onUpdate(); // Refresh the user list after update
                    window.alert("User updated successfully.");
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            // Add new user (This part can be omitted if you don't want to add new users in this form)
            axios.post("http://localhost:3000/user/add", formData)
                .then(response => {
                    onUpdate(); // Refresh the user list after adding a new user
                    window.alert("User added successfully.");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="container border mt-4 bg-secondary p-4 rounded">
            <h1 className="text-center">Form Area</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Father's Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="fathername"
                    value={formData.fathername}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary mt-3">{user && user._id ? "Update User" : "Add User"}
            </button>
        </form>
        </div>
    );
}
