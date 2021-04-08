import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { get, put } from '../../api/base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';


function FormReveal(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <Alert variant="info">
                <Alert.Heading>Advertencia</Alert.Heading>
                <p className="mb-0">
                    Al revelar el contenido, se eliminará el registro y el enlace ya no será válido.
                </p>
            </Alert>
            <Form onSubmit={handleSubmit(props.onSubmit)}>
                {props.secret.encrypted && <Form.Row>
                    <Form.Group as={Col} controlId="key">
                        <Form.Label>Palabra cláve</Form.Label>
                        <Form.Control type="password"
                            { ...register("key", { required: props.secret.encrypted }) }
                            isInvalid={!!errors.key} />
                        <Form.Control.Feedback type="invalid">
                            La palabra clave es requerida para revelar el secreto
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>}
                <Button variant="primary" type="submit">Revelar</Button>
            </Form>
        </>
    )
}


function FormContent(props) {
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="key">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control as="textarea" disabled value={props.secret.content} />
                </Form.Group>
            </Form.Row>
            <Button variant="outline-secondary" onClick={props.onClick}>
                <FontAwesomeIcon icon={faCopy} />
                <span>Copy</span>
            </Button>
        </Form>
    )
}


export function Reveal(props) {
    const [secret, setSecret] = useState({
        content: null,
        encrypted: false
    });

    const [loaded, setLoaded] = useState(false);
    const { secretid } = useParams();
    let history = useHistory();

    useEffect(() => {
        get(`/api/confidential/${secretid}`).then((response) => {
            setSecret((prev) => ({
                ...prev,
                encrypted: response.data.encrypted
            }))
        }).catch(() => {
            history.push('/404');
        }).finally(() => {
            setLoaded(true);
        })
    }, [])

    function handleRevealSubmit(data) {
        put(`/api/confidential/${secretid}/reveal`, data).then((response) => {
            setSecret((prev) => ({
                ...prev,
                content: response.data.content
            }))
        }).catch((response) => {
            console.log("error response: %o", response)
        })
    }

    function handleCopy() {
        navigator.clipboard.writeText(secret.content)
    }

    if (loaded) {
        return (
            secret.content == null ?
                <FormReveal secret={secret} onSubmit={handleRevealSubmit} /> : 
                <FormContent secret={secret} onClick={handleCopy} />
        );
    } else {
        return null;
    }
}
