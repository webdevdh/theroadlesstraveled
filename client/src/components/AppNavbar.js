import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    Input
} from 'reactstrap';
import TodoModal from './TodoModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSearchTodos } from '../actions/todoActions';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        todo: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    onSearch = e => {
        if(e.key === 'Enter'){
            const searchPrm = e.target.value;
            this.props.getSearchTodos(searchPrm);
            document.getElementById('browse').scrollIntoView();
        }
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}` : '' }</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5" fixed="top">
                    <Container>
                        <NavbarBrand href="/"><strong>The Road Less Traveled</strong></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <TodoModal />
                                </NavItem>
                                &nbsp;&nbsp;
                                <NavItem style={{marginRight: "20px", maxWidth: "180px"}}>
                                    <Input
                                        type="text"
                                        name="search"
                                        placeholder="search"
                                        onKeyPress={this.onSearch}
                                    />
                                </NavItem>
                                { isAuthenticated ? authLinks : guestLinks }
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todo: state.todo,
    auth: state.auth
});

export default connect(mapStateToProps, { getSearchTodos })(AppNavbar);

