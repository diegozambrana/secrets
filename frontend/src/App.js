import logo from './logo.svg';
import './App.scss';

import {Switch, Route, BrowserRouter, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {CreateForm} from './pages/Create';
import {Reveal} from './pages/Reveal';
import Page404 from './pages/Page404';


function App() {
    return (
        <BrowserRouter>        
            <Container>
                <Row>
                    <Col id="brand" className="text-center">
                        <Link to="/">
                            <img src={logo} className="App-logo" alt="logo" width="150" />
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Switch>
                            <Route exact path='/' component={CreateForm} />
                            <Route exact path='/404' component={Page404} />
                            <Route exact path='/:secretid' component={Reveal} />
                            <Route path="*">
                                <Page404 />
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>        
    );
}

export default App;
