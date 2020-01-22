import axios from 'axios';
import { GET_TODOS, ADD_TODO, DELETE_TODO, TODOS_LOADING, GETSEARCH_TODOS } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getTodos = () => dispatch => {
    dispatch(setTodosLoading());
    axios
        .get('/api/todos')
        .then(res =>
            dispatch({
                type: GET_TODOS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const getSearchTodos = search => dispatch => {
    dispatch(setTodosLoading());
    axios
        .get(`/api/todos/${search}`)
        .then(res =>
            dispatch({
                type: GETSEARCH_TODOS,
                payload: res.data
            })
        )
};

export const deleteTodo = id => (dispatch, getState) => {
    axios
        .delete(`/api/todos/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_TODO,
                payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addTodo = todo => (dispatch, getState) => {
    axios
        .post('/api/todos', todo, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_TODO,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setTodosLoading = () => {
    return {
        type: TODOS_LOADING
    };
};