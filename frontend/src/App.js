import logo from './logo.svg';
import './App.scss';

import {Switch, Route, BrowserRouter } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {CreateForm} from './pages/Create';
import {RevealForm} from './pages/Reveal'


function App() {
    return (
        <BrowserRouter>        
            <Container>
                <Row>
                    <Col className="text-center">
                        <img src={logo} className="App-logo" alt="logo" width="150" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Switch>
                            <Route exact path='/' component={CreateForm} exact />
                            <Route exact path='/:id' component={RevealForm} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>        
    );
}

export default App;
