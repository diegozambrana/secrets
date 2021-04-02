import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'


export function CreateForm(props) {
    const [secret, setSecret] = useState({});
    const [completed, setCompleted] = useState(false);
    const [showAlert, setShowAlert] = useState(true);

    function handleSubmit(event) {
        event.preventDefault();
        console.log("clicking: %o", completed);
        setCompleted(true);
        setShowAlert(true);
    }

    let formContent = (
        <Form>
            <Form.Group controlId="content">
                <Form.Label>Secreto</Form.Label>
                <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="lifetime">
                    <Form.Label>Válido por</Form.Label>
                    <Form.Control as="select">
                        <option value="1">1 hora</option>
                        <option value="1">2 horas</option>
                        <option value="1">3 horas</option>
                        <option value="24">1 día</option>
                        <option value="48">2 días</option>
                        <option value="720">7 días</option>
                        <option value="720">30 días</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="key">
                    <Form.Label>Palabra cláve</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
            </Form.Row>
            <Button onClick={handleSubmit} variant="primary" type="submit">Crear</Button>
        </Form>
    )

    let formMessage = (
        <>
            {
                showAlert ?
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    <p className="mb-0">
                        El secreto se creo existosamente.
                    </p>
                </Alert> : null
            }
            <Form>
                <InputGroup className="mb-3">
                    <Form.Control
                        disabled
                        placeholder=""
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary">
                            <FontAwesomeIcon icon={faCopy} />
                            Copy
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
            <Button onClick={() => setCompleted(false)}>Retornar</Button>
        </>
    )

    return completed ? formMessage : formContent;
}
