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


const styles = {
    width: "100%"
}

function FormCreate(props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    function onSubmit(data) {
        props.onSubmit(data).then((response) => {
            reset()
        })
    }

    return (
        <Form onSubmit={ handleSubmit(onSubmit) }>
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
            <Button style={styles} variant="primary" type="submit">Crear</Button>
        </Form>
    )
}

function FormMessage(props) {
    const [showAlert, setShowAlert] = useState(true);

    const handleCopy = ({ target }) => {
        navigator.clipboard.writeText(getURI())
    }

    const handleReturn = () => {
        console.log("++++ handleReturn")
        setShowAlert(true);
        props.onReturn();
    }

    const getURI = () => {
        return `${window.location.href}${props.secret.id}`;
    }

    return (
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
                        <Button variant="outline-secondary" onClick={handleCopy}>
                            <FontAwesomeIcon icon={faCopy} />
                            Copy
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
            <Button onClick={handleReturn}>Retornar</Button>
        </>
    )
}


export function CreateForm(props) {
    const [secret, setSecret] = useState({id: null});

    const reset = () => {
        setSecret({id: null})
    }

    function handleCreate(data) {
        return post('/api/confidential', data).then((response) => {
            setSecret((prev) => ({...prev, id: response.data.id}));
        })
    }

    return (
        <>
            <p className="top-buffer font-italic">
                Crea y comparte textos de forma secreta y con un enlace que se
                invalida una vez utilizado.
            </p>
            {secret.id != null ?
                <FormMessage secret={secret} onReturn={reset} /> :
                <FormCreate secret={secret} onSubmit={handleCreate} /> }
        </>
    )
}
