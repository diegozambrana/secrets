import logo from './logo.svg';
import './App.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

function App() {
    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <img src={logo} className="App-logo" alt="logo" width="150" />
                </Col>
            </Row>
            <Row>
                <Col>
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
                    <Button variant="primary" type="submit">Crear</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
