import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import userData from './Data';
import './App.css';

function App() {
  const [users, setUsers] = useState(userData);
  return (
    <div className='container-fluid'>
      <span id="title"><h1 style={{textAlign: 'center'}}> Customer's Details </h1></span>          {/*Title*/}
      <br></br> 
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div>
        {  
          userData.map((used) => (
            <div className='container-fluid'>
            <div className='row'>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>      {/* How data is styled*/}
            <ul key={used.id}>
            <hr></hr>
              <li><strong>Id : </strong>{used.id}</li>
              <li><strong>Name : </strong>{used.name}</li>
              <li><strong>Email : </strong>{used.email}</li>
              <li><strong>Age : </strong>{used.age}</li>
              <hr></hr>
            </ul>
            </div>
            </div>
            </div>
          ))
        }
        </div>
    </div>
    </div>
  );
}

export default App;
