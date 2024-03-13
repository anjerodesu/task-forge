import { ADD_TODO, DELETE_TODO, SET_TODO, TOGGLE_TODO } from '../actions/types'

const initialState = {
    todos: []
}

/**
 * todosReducer
 *
 * The reducer for the todos
 * @param {Object} state - The state object for the todos
 * @param {Object} action - The object holding which action to perform.
 * @return {*} - The new state object based on the action type taken.
 */
const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODO:
            return {
                ...state,
                todos: action.payload
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)
            }
        default:
            return state
    }
}

export default todosReducer
