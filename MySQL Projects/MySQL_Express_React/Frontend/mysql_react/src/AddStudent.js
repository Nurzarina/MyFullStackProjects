import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

function AddStudent() {
    // State variables for storing the name and email input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [marks, setMarks] = useState('');
    const [grade, setGrade] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate(); // useNavigate hook to navigate programmatically
    // Function to handle form submission
    function handlesubmit(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        axios.post("http://localhost:5000/create", { name, email, marks, grade, city }) // Send POST request to create a new student
            .then(res => {
                console.log(res); // Log the server response
                navigate("/"); // Navigate to the homepage after successful submission
            }).catch(err => console.log(err)); // Log any errors that occur during the request
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handlesubmit}> {/* Form submission triggers handlesubmit function */}
                    <h2>Add Student</h2>
                    <div className='mb-3'>
                        <label>Name</label>
                        <input
                            type='text'
                            className='form-control'
                            onChange={(e) => setName(e.target.value)} // Update name state when input value changes
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Email</label>
                        <input
                            type='text'
                            className='form-control'
                            onChange={(e) => setEmail(e.target.value)} // Update email state when input value changes
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
                    <button className="btn btn-success">Submit</button> {/* Submit button to trigger form submission */}
                </form>
            </div>
        </div>
    )
}
export default AddStudent;
