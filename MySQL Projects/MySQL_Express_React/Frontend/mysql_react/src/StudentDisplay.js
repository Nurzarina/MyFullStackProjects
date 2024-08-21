import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';

function StudentDisplay() {
    const [student, setStudent] = useState([]); 

    useEffect(() => {
        axios.get("http://localhost:5000/") 
            .then(res => setStudent(res.data)) 
            .catch(err => console.log(err)); 
    }, []); 

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:5000/student/' + id) 
            window.location.reload() 
        }
        catch (error) {
            console.log(error) 
        }
    }

    return (
        <Container fluid className='vh-100 d-flex flex-column justify-content-center align-items-center bg-success'>
            <Card className='w-75'>
                <Card.Header className='text-center'>
                    <h1>Students Information</h1>
                </Card.Header>
                <Card.Body>
                    <Link to={"/create"}>
                        <Button variant='info' className='mb-3'>Add Student</Button>
                    </Link>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Marks</th>
                                <th>Grade</th>
                                <th>City</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                student.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.marks}</td>
                                        <td>{data.grade}</td>
                                        <td>{data.city}</td>
                                        <td>
                                            <Link to={`update/${data.id}`}>
                                                <Button variant='warning' className='me-2'>Update</Button>
                                            </Link>
                                            <Button variant='danger' onClick={() => handleDelete(data.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default StudentDisplay;
