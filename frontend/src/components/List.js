import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function List(props) {
    return (
        <div>
            <h1>A list of hotel packages</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Validity Duration</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.packages.map(hotelPackage => {
                        return (
                            <tr key={hotelPackage.id}>
                                <td>{hotelPackage.hotel_name}</td>
                                <td>{hotelPackage.price}</td>
                                <td>{hotelPackage.duration}</td>
                                <td>{hotelPackage.validity_duration}</td>
                                <td>{hotelPackage.description}</td>
                                <td>
                                    <Button variant="warning" onClick={() => props.turnOnEdit(hotelPackage.id)}>Edit</Button>{'  '}
                                    <Button variant="danger" onClick={() => props.deletePackage(hotelPackage.id)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <Button variant="primary" onClick={() => props.turnOnCreate()}>Add A Package</Button>
        </div>
    );
}
