import React, { useEffect, useState } from "react";
import axios from "axios";
import FormArea from './FormArea';

export default function UserManagement() {
    const [userList, setUserList] = useState([]);
    const [userUpdateList, setUserUpdateList] = useState(null);

    const handleDelete = (_id) => {
        if (window.confirm("Are you sure?")) {
            axios.delete(`http://localhost:3000/user/isdelete/${_id}`)
                .then(() => {
                    const updateList = userList.filter((user) => user._id !== _id);
                    setUserList(updateList);
                    window.alert("User deleted successfully.");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const handleUpdate = (user) => {
        setUserUpdateList(user);  // Set the selected user to update
    }

    const refreshUserList = () => {
        axios.get("http://localhost:3000/user/getUser").then(response => {
            console.log("sjsdchsdjkcshdcs",response.data.data);
            
            setUserList(response.data.data);
            setUserUpdateList(null);  // Clear the form after update
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        refreshUserList();
    }, []);


    return (
        <>
            <div className="container border mt-4 bg-secondary p-4 rounded">
                <h1 className="text-center">User Management</h1>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>So_no</th>
                            <th>Name</th>
                            <th>Father's Name</th>
                            <th>Email</th>
                            <th>Phone No.</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList?.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.fathername}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleUpdate(user)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             
                
                {userUpdateList && (
                    <div className="mt-4"><h2>Edit User</h2><FormArea user={userUpdateList} onUpdate={refreshUserList} />
                    </div>
                )}
            </div>
        </>
    );
}
