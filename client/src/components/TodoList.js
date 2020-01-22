import React, { Component } from 'react';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { getTodos, deleteTodo } from '../actions/todoActions';
import PropTypes from 'prop-types';
import DescModal from './DescModal';

class TodoList extends Component {
    componentDidMount() {
        this.props.getTodos();
    }

    onDeleteClick = id => {
        this.props.deleteTodo(id);
    };

    render() {
        const { todos } = this.props.todo;
        return(
            <Container>
                    <Row>
                        {todos.map(({ _id, country, city, place, desc, imgUrl, email }) => (
                                <Col xs="12" md="4" key={_id}>
                                    <Card style={{marginBottom: "20px"}}>
                                        <CardImg top width="100%" height="200px" src={imgUrl} alt="pic" />
                                        <CardBody>
                                            <CardTitle style={{fontWeight: "bold"}}>{place}</CardTitle>
                                            <CardText>{city} - {country}</CardText>
                                            <DescModal country={country} city={city} place={place} desc={desc} imgUrl={imgUrl} _id={_id} email={email}/>
                                        </CardBody>
                                    </Card>
                                </Col>
                        ))}
                        </Row>
            </Container>
        );
    }
}

TodoList.propTypes = {
    getTodos: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    todo: state.todo
});

export default connect(
    mapStateToProps,
    { getTodos, deleteTodo }
)(TodoList);

