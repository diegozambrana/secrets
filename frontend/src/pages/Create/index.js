import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { post } from '../../api/base';
import { useForm } from 'react-hook-form';


export function CreateForm(props) {
    const [secretId, setSecretId] = useState(null);
    const [showAlert, setShowAlert] = useState(true);
    const { register, handleSubmit, reset, formState: { isDirty, isValid, isSubmitting, touched, submitCount, errors } } = useForm();

    function onSubmit(data) {
        post('/api/confidential', data).then((response) => {
            console.log("response: %o", response);
            setSecretId(response.data.id);
            setShowAlert(true);
            reset();
        })
    }

    function handleClick({ target }) {
        navigator.clipboard.writeText(getURI())
    }

    function getURI() {
        return `${window.location.href}${secretId}`;
    }

    let formCreate = (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="content">
                <Form.Label>Secreto</Form.Label>
                <Form.Control as="textarea" rows="3" {...register("content", { required: true })} isInvalid={!!errors.content} />
                <Form.Control.Feedback type="invalid">
                    El contenido del secreto es requerido.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="lifetime">
                    <Form.Label>Válido por</Form.Label>
                    <Form.Control as="select" {...register("lifetime", { required: true })}>
                        <option value="1">1 hora</option>
                        <option value="2">2 horas</option>
                        <option value="3">3 horas</option>
                        <option value="24">1 día</option>
                        <option value="48">2 días</option>
                        <option value="720">7 días</option>
                        <option value="720">30 días</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="key">
                    <Form.Label>Palabra cláve</Form.Label>
                    <Form.Control type="password" {...register("key")} />
                </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">Crear</Button>
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
                        value={getURI()}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={handleClick}>
                            <FontAwesomeIcon icon={faCopy} />
                            Copy
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
            <Button onClick={() => setSecretId(null)}>Retornar</Button>
        </>
    )

    console.log("secretId: %o", secretId)

    return secretId != null ? formMessage : formCreate;
}
