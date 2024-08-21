import React, { useState } from 'react'; // Import React and useState hook for managing component state
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate for navigation and usePara

function UpdateStudent() {
    // State variables to store the name and email input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [marks, setMarks] = useState('');
    const [grade, setGrade] = useState('');
    const [city, setCity] = useState('');
    const { id } = useParams(); // Extract the 'id' parameter from the route
    const navigate = useNavigate(); // Hook for navigating programmatically
    // Function to handle the form submission
    function handleSubmit(e) {
        e.preventDefault(); // Prevent default form submission behavior
        axios.put('http://localhost:5000/update/' + id, { name, email, marks, grade, city}) // Send a PUT request to update the student data
            .then(res => {
                console.log(res); // Log the response from the server
                navigate("/"); // Navigate back to the homepage after a successful update
            })
            .catch(err => {
                console.error("Update error:", err); // Log any errors that occur during the request
            });
    }

    return (
        <div className='d-flex vh-100 bg-warning justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}> {/* Form submission triggers handleSubmit function */}
                    <h2>Update Student</h2>
                    <div className='mb-3'>
                        <label>Name</label>
                        <input
                            type='text'
                            className='form-control'
                            value={name} // Bind input value to name state
                            onChange={(e) => setName(e.target.value)} // Update name state when input changes
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Email</label>
                        <input
                            type='email'           //set type to email so that invalid email will not be accepted.
                            className='form-control'
                            value={email} // Bind input value to email state
                            onChange={(e) => setEmail(e.target.value)} // Update email state when input changes
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Marks</label>
                        <input
                            type='int'
                            className='form-control'
                            value={marks} // Bind input value to marks state
                            onChange={(e) => setMarks(e.target.value)} // Update marks state when input changes
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Grade</label>
                        <input
                            type='text'
                            className='form-control'
                            value={grade} // Bind input value to grade state
                            onChange={(e) => setGrade(e.target.value)} // Update grade state when input changes
                        />
                    </div>
                    <div className='mb-3'>
                        <label>City</label>
                        <input
                            type='text'
                            className='form-control'
                            value={city} // Bind input value to city state
                            onChange={(e) => setCity(e.target.value)} // Update city state when input changes
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Update</button> {/* Button to submit the form */}
                </form>
            </div>
        </div>
    );
}
export default UpdateStudent;


