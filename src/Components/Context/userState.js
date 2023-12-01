import React, { useState, useEffect } from "react";
import UserContext from "./userContext";
import { useNavigate } from 'react-router-dom';

const UserState = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const deleteUser = (userId) => {
    // Filter out the user with the specified ID
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    setSelectedUserIds(prevSelectedUserIds => prevSelectedUserIds.filter(id => id !== userId));

  }

  const editUser = (userId, newName, newEmail, newRole) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, name: newName, email: newEmail, role: newRole } : user
    );
    setUsers(updatedUsers);
  }

  const getnotes = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      
    }
  }

  useEffect(() => {
    getnotes();
  }, []);

  const handleCheckboxChange = (userId) => {
    setSelectedUserIds(prevSelectedUserIds => {
      if (prevSelectedUserIds.includes(userId)) {
        return prevSelectedUserIds.filter(id => id !== userId);
      } else {
        return [...prevSelectedUserIds, userId];
      }
    });
  };
  const deleteSelectedUsers = () => {
    const updatedUsers = users.filter(user => !selectedUserIds.includes(user.id));
    setUsers(updatedUsers);
    setSelectedUserIds([]); // Clear the selectedUserIds array
  };


  return (
    <UserContext.Provider value={{ users, deleteUser,editUser, deleteSelectedUsers,handleCheckboxChange, selectedUserIds, setSelectedUserIds }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
