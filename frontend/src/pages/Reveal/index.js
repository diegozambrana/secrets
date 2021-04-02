import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';


export function RevealForm(props) {
    const [encrypted, setEncrypted] = useState(true);
    const [content, setContent] = useState('lorem ipsum');

    function handleSubmit(event) {
        event.preventDefault();
        console.log("encrypted: %o", encrypted);
    }

    let formReveal = (
        <>
            <Alert variant="info">
                <Alert.Heading>Advertencia</Alert.Heading>
                <p className="mb-0">
                    Al revelar el contenido, se eliminará el registro y el enlace ya no será válido.
                </p>
            </Alert>
            <Form>
                {encrypted && <Form.Row>
                    <Form.Group as={Col} controlId="key">
                        <Form.Label>Palabra cláve</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                </Form.Row>}
                <Button onClick={handleSubmit} variant="primary" type="submit">Revelar</Button>
            </Form>
        </>
    )

    let formContent = (
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="key">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control as="textarea" disabled />
                </Form.Group>
            </Form.Row>
            <Button variant="outline-secondary">
                <FontAwesomeIcon icon={faCopy} />
                <span>Copy</span>
            </Button>
        </Form>
    )

    return (content == null ? formReveal : formContent)
}
