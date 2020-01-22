import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import { deleteTodo } from '../actions/todoActions';
import PropTypes from 'prop-types';

class DescModal extends Component {
    state = {
        modal: false
    }

    static propTypes = {
        todo: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onDeleteClick = id => {
        this.props.deleteTodo(id);
    };

    render() {
        return(
            <div>
                <Button
                    color="secondary"
                    onClick={this.toggle}
                >read more</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>{this.props.place} [{this.props.city} - {this.props.country}]</ModalHeader>
                    <ModalBody>
                        <img src={this.props.imgUrl} alt="pic" style={{width: "100%", height: "auto"}} />
                        <div style={{height: "10px"}}></div>
                        {this.props.desc}
                    </ModalBody>
                    <ModalFooter>
                        {this.props.isAuthenticated && this.props.user.email === this.props.email ? (
                        <Button
                            className="remove-btn"
                            color="danger"
                            onClick={this.onDeleteClick.bind(this, this.props._id)}
                        >
                            delete
                        </Button>
                        ) : null}
                        <Button color="info" onClick={this.toggle}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todo: state.todo,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { deleteTodo })(DescModal);

