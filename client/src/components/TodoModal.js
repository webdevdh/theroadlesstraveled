import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todoActions';
import PropTypes from 'prop-types';

class TodoModal extends Component {
    state = {
        modal: false,
        country: '',
        city: '',
        place: '',
        desc: '',
        imgUrl: '',
        countryColor: 'default',
        cityColor: 'default',
        placeColor: 'default',
        descColor: 'default',
        imgUrlColor: 'default'
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            country: '',
            city: '',
            place: '',
            desc: '',
            imgUrl: '',
            countryColor: 'default',
            cityColor: 'default',
            placeColor: 'default',
            descColor: 'default',
            imgUrlColor: 'default'
        });
    };

    onChange = e => {
        if((e.target.name === 'city')
            && !isNaN(e.target.value.substr(-1, 1))
            && e.target.value !== '') {
            document.getElementById('city').placeholder = 'This field cannot contain numbers';
            e.target.value = e.target.value.substr(0, e.target.value.length - 1);
            return;
        } else {
            document.getElementById('city').placeholder = 'ex. London';
        }
        if((e.target.name === 'country')
            && !isNaN(e.target.value.substr(-1, 1))
            && e.target.value !== '') {
            document.getElementById('country').placeholder = 'This field cannot contain numbers';
            e.target.value = e.target.value.substr(0, e.target.value.length - 1);
            return;
        } else {
            document.getElementById('country').placeholder = 'ex. United Kingdom';
        }
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = e => {
        e.preventDefault();

        let returnForm = false;

        if(this.state.country === '') {
            this.setState({countryColor: "red"});
            returnForm = true;
        } else {
            this.setState({countryColor: "lightgray"});
        }

        if(this.state.city === '') {
            this.setState({cityColor: "red"});
            returnForm = true;
        } else {
            this.setState({cityColor: "lightgray"});
        }

        if(this.state.place === '') {
            this.setState({placeColor: "red"});
            returnForm = true;
        } else {
            this.setState({placeColor: "lightgray"});
        }

        if(this.state.desc === '') {
            this.setState({descColor: "red"});
            returnForm = true;
        } else {
            this.setState({descColor: "lightgray"});
        }

        if(this.state.imgUrl === '') {
            this.setState({imgUrlColor: "red"});
            returnForm = true;
        } else {
            this.setState({imgUrlColor: "lightgray"});
        }

        if(returnForm) {
            return;
        }

        const newTodo = {
            country: this.state.country,
            city: this.state.city,
            place: this.state.place,
            desc: this.state.desc,
            imgUrl: this.state.imgUrl,
            email: this.props.user.email
        }

        this.props.addTodo(newTodo);

        this.setState({
            country: '',
            city: '',
            place: '',
            desc: '',
            imgUrl: ''
        });

        this.toggle();
    };

    render() {
        return(
            <div>
                {this.props.isAuthenticated ? (
                <Button
                    color="primary"
                    onClick={this.toggle}
                >
                    add recommendation
                </Button>
                ) : (
                    <span></span>
                )}

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add a recommendation</ModalHeader>
                    <ModalBody>
                        <p style={{color: "red"}}>*all fields are required</p>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="country">Country</Label>
                                <Input
                                    type="text"
                                    name="country"
                                    id="country"
                                    placeholder="ex. United Kingdom"
                                    onChange={this.onChange}
                                    style={{borderColor: this.state.countryColor}}
                                />
                                <Label for="city">City</Label>
                                <Input
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="ex. London"
                                    onChange={this.onChange}
                                    style={{borderColor: this.state.cityColor}}
                                />
                                <Label for="place">Place</Label>
                                <Input
                                    type="text"
                                    name="place"
                                    id="place"
                                    placeholder="ex. Covent Garden Cafe"
                                    onChange={this.onChange}
                                    style={{borderColor: this.state.placeColor}}
                                />
                                <Label for="desc">Description</Label>
                                <Input
                                    type="textarea"
                                    name="desc"
                                    id="desc"
                                    placeholder="your experience in this place"
                                    onChange={this.onChange}
                                    style={{borderColor: this.state.descColor}}
                                />
                                <Label for="imgUrl">Image Url</Label>
                                <Input
                                    type="text"
                                    name="imgUrl"
                                    id="imgUrl"
                                    placeholder="ex. http://www.visitlondon.co.uk/londoneye"
                                    onChange={this.onChange}
                                    style={{borderColor: this.state.imgUrlColor}}
                                />
                                <Button color="primary" style={{marginTop: '2rem'}} block>
                                    submit
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
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

export default connect(mapStateToProps, { addTodo })(TodoModal);

