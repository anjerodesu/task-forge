import { ADD_TODO, DELETE_TODO, SET_TODO, TOGGLE_TODO } from './types'

/**
 * setTodos
 *
 * Set the todos on initial load
 * @param todos
 * @return {{payload, type: string}}
 */
export const setTodos = todos => ({
    type: SET_TODO,
    payload: todos
})

/**
 * addTodo
 *
 * Adds a new todo
 * @param {string} title - Title of the todo.
 * @param {string} description - Description of the todo.
 * @param {1|2|3} priority - Priority of the todo.
 * @return {{payload: {description, id: number, completed: boolean, title, priority}, type: string}}
 */
export const addTodo = (title, description, priority) => ({
    type: ADD_TODO,
    payload: { id: Math.random(), title, description, priority, completed: false }
})

/**
 * deleteTodo
 *
 * Deletes a todo
 * @param {number} id - The ID of the todo to delete.
 * @return {{payload, type: string}}
 */
export const deleteTodo = id => ({
    type: DELETE_TODO,
    payload: id
})

/**
 * toggleTodo
 *
 * Toggles a todo
 * @param {number} id - The ID of the todo to toggle incomplete or complete.
 * @return {{payload, type: string}}
 */
export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    payload: id
})
