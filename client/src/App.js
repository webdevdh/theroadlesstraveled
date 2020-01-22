import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import TodoList from './components/TodoList';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
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
          <div className='explain' id='explainid'>
            <div className='third'>
              <h5 style={{ color: '#FF8000' }}>Browse</h5>
              Browse off the beaten path travel recommendations all over the world
            </div>
            <div className='third'>
              <h5 style={{ color: '#FF8000' }}>Search</h5>
              Search for unique recommendations in the city or country you want
            </div>
            <div className='third'>
              <h5 style={{ color: '#FF8000' }}>Recommend</h5>
              Add your own recommendation - sign up (for free) to do so
            </div>
          </div>
          <Container id='browse'>
            <TodoList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
