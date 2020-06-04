import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TheForm(props) {

    return props.enableForm ? (
        <div>
            <hr></hr>
            <h2>{props.formMode == 'edit' ? 'Edit': 'Create A Package'}</h2>
            <Row>
                <Col xs={12} md={6}>
                    <Form onSubmit={props.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Hotel Name</Form.Label>
                            <Form.Control type="text" name="hotel_name" value={props.packageToSave.hotel_name} onChange={props.handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="price" value={props.packageToSave.price} onChange={props.handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control name="duration" value={props.packageToSave.duration} onChange={props.handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Validity Duration</Form.Label>
                            <Form.Control name="validity_duration" value={props.packageToSave.validity_duration} onChange={props.handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" value={props.packageToSave.description} onChange={props.handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    ) : <div></div>;
}
