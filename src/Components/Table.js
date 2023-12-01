import React, { useContext, useEffect, useState } from 'react';
import UserContext from './Context/userContext';

const Table = () => {
  const context = useContext(UserContext);
  const { users, deleteUser,editUser,deleteSelectedUsers,handleCheckboxChange,selectedUserIds,setSelectedUserIds } = context;
  const entriesPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [editingUserId, setEditingUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectAll, setSelectAll] = useState(false);

 

    
      

const[flag,setFlag]=useState(false);

const handlechangeName = (e) => {
    setName(e.target.value);

}
const handlechangeEmail = (e) => {
    setEmail(e.target.value);
}
const handlechangeRole = (e) => {
    setRole(e.target.value);
    
}

const handleSubmit = (id) => {
     editUser(id,name,email,role);
     setName('');
    setEmail('');
    setRole('');
    setFlag(true);
}
const handleEditClick = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setEditingUserId(user.id);
     
  };

 const  handleClick = (id) => {
    console.log('The link was clicked.');
    deleteUser(id);

  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Your useEffect logic here
  }, [users]);

  // Calculate the range of users to display based on the current page
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const usersToDisplay = filteredUsers.slice(startIndex, endIndex);

  const handleSelectAllChange = () => {
    const currentPageUserIds = usersToDisplay.map(user => user.id);
  
    // If all users on the current page are selected, unselect them; otherwise, select them
    setSelectedUserIds(prevSelectedUserIds => {
      const allSelected = currentPageUserIds.every(id => prevSelectedUserIds.includes(id));
      
      if (allSelected) {
        return prevSelectedUserIds.filter(id => !currentPageUserIds.includes(id));
      } else {
        return [...prevSelectedUserIds, ...currentPageUserIds];
      }
    });
  };
  
  
  return (
    <div>
         
    <div className="table-container" >
     <div className="row">
        <div className="col-6">
        <input value={searchQuery} style={{width:"400px", display:"flex", justifyContent:"flext-start",  borderRadius:"7px", height:"45px"}}
        onChange={handleSearchChange} type="text" placeholder="Enter Value" className="search-bar" />
        </div>
        <div className="col-6">
        
        <i onClick={deleteSelectedUsers} style={{display:"flex", justifyContent:"flex-end", marginRight:"30px", marginTop:"30px"}} className="fa-solid fa-trash fa-xl"></i>
        </div>
     </div>
    

    
        
      <div className="table-box">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">
              <button style={{fontWeight:"bold"}}  className='btn' onClick={handleSelectAllChange}>Select all</button>
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersToDisplay.map((user) => (
              <tr key={user.id}>
                <td>
                  <input checked={selectAll ||selectedUserIds.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                   type="checkbox" />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <button className='btn'><i onClick={()=>handleClick(user.id)} className=" fa fa-trash fa-lg"></i></button>
                  

<button onClick={() => handleEditClick(user)}
 type="button" className="btn " data-bs-toggle="modal" data-bs-target={`#exampleModal${user.id}`}>
<i className="fa fa-edit fa-lg"></i>
</button>

<div className="modal fade" id={`exampleModal${user.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
  <input value={name} onChange={handlechangeName} type="text" className="form-control" id="formGroupExampleInput" placeholder="Write name here"/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
  <input value={email} onChange={handlechangeEmail} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Write Email here"/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput2" className="form-label">Role</label>
  <input value={role} onChange={handlechangeRole} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Write Role here"/>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button   data-bs-dismiss="modal"
 type="button" onClick={()=>handleSubmit(user.id)} className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
   
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button
        className='mx-3 my-3 btn btn-dark'
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
         <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span style={{fontSize:"18px"}} className='my-3'>{`Page ${currentPage}`}</span>
        <button
        className='mx-3 my-3 btn btn-dark'
          disabled={endIndex >= users.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
    </div>
  );
}

export default Table;
