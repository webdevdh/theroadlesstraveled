import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import TodoList from './components/TodoList';
import { Container, Row, Col } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
// import { loadUser } from './actions/authActions';
import { Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
//    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <div className="bg" id='bgid'>
            <span>
              Unique Travel Recommendations
            </span>
            <a href='#explainid'>
              <Button className='explore'>
                Explore
              </Button>
            </a>
          </div>
          <Container>
          <Row className='explain' id='explainid'>
            <Col xs="12" md="4" className='third'>
              <h5 className='titleColor'>Browse</h5>
              Browse off the beaten path travel recommendations all over the world
            </Col>
            <Col xs="12" md="4" className='third'>
              <h5 className='titleColor'>Search</h5>
              Search for unique recommendations in the city or country you want
            </Col>
            <Col xs="12" md="4" className='third'>
              <h5 className='titleColor'>Recommend</h5>
              Add your own recommendation - sign up (for free) to do so
            </Col>
          </Row>
          </Container>
          <Container id='browse'>
            <TodoList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
